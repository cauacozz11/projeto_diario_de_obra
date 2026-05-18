import { describe, it, expect, beforeEach, vi } from 'vitest'
import { prismaMock } from '@/tests/mocks/prisma'
import { cadastrarUsuario } from './cadastrarUsuario'
import { UsuarioInput } from '@/schemas/usuario'

const dadosValidos: UsuarioInput = {
    nome: 'Nome testando',
    email: 'teste@gmail.com',
    telefone: '11111111111',
    senha: '89ijfnw985u2409$$',
}

const usuarioCriado = {
    id: 'id-fake-123',
    nome: 'Nome testanto',
    email: 'teste@gmail.com',
    telefone: '111111111111',
    senha: 'hash-fake',
    emailVerified: null,
    image: null,
    createdAt: new Date(),
}

beforeEach(() => {
    vi.resetAllMocks()
})

describe('cadastrarUsuario — sucesso', () => {
    it('deve cadastrar um usuário com sucesso e não retornar a senha', async () => {
        prismaMock.usuario.findUnique.mockResolvedValue(null)
        prismaMock.usuario.create.mockResolvedValue(usuarioCriado)

        const resultado = await cadastrarUsuario(dadosValidos)

        expect(resultado.sucesso).toBe(true)
        if (resultado.sucesso) {
            expect(resultado.usuario).not.toHaveProperty('senha')
            expect(resultado.usuario.id).toBe('id-fake-123')
            expect(resultado.usuario.nome).toBe('Cauã Cozzarin')
            expect(resultado.usuario.email).toBe('cauacozz@gmail.com')
        }
    })

    it('deve cadastrar usuário sem telefone (campo opcional)', async () => {
        const dadosSemTelefone: UsuarioInput = { ...dadosValidos, telefone: undefined }
        const usuarioSemTelefone = { ...usuarioCriado, telefone: null }

        prismaMock.usuario.findUnique.mockResolvedValue(null)
        prismaMock.usuario.create.mockResolvedValue(usuarioSemTelefone)

        const resultado = await cadastrarUsuario(dadosSemTelefone)

        expect(resultado.sucesso).toBe(true)
    })

    it('deve normalizar o email para minúsculas no findUnique e no create', async () => {
        prismaMock.usuario.findUnique.mockResolvedValue(null)
        prismaMock.usuario.create.mockResolvedValue(usuarioCriado)

        await cadastrarUsuario({ ...dadosValidos, email: 'CAUACOZZ@GMAIL.COM' })

        expect(prismaMock.usuario.findUnique).toHaveBeenCalledWith({
            where: { email: 'cauacozz@gmail.com' },
        })
        expect(prismaMock.usuario.create).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({ email: 'cauacozz@gmail.com' }),
            })
        )
    })

    it('deve salvar a senha como hash, nunca em texto puro', async () => {
        prismaMock.usuario.findUnique.mockResolvedValue(null)
        prismaMock.usuario.create.mockResolvedValue(usuarioCriado)

        await cadastrarUsuario(dadosValidos)

        const chamada = prismaMock.usuario.create.mock.calls[0][0]
        expect(chamada.data.senha).not.toBe(dadosValidos.senha)
        expect(chamada.data.senha).toMatch(/^\$2[aby]\$/)
    })
})

describe('cadastrarUsuario — email duplicado', () => {
    it('deve retornar erro quando o email já está cadastrado', async () => {
        prismaMock.usuario.findUnique.mockResolvedValue(usuarioCriado)

        const resultado = await cadastrarUsuario(dadosValidos)

        expect(resultado.sucesso).toBe(false)
        if (!resultado.sucesso) {
            expect(resultado.erro).toBe('Email já cadastrado')
        }
    })

    it('não deve chamar create quando o email já existe', async () => {
        prismaMock.usuario.findUnique.mockResolvedValue(usuarioCriado)

        await cadastrarUsuario(dadosValidos)

        expect(prismaMock.usuario.create).not.toHaveBeenCalled()
    })
})

describe('cadastrarUsuario — validação de nome', () => {
    it('deve retornar erro com nome muito curto (< 2 chars)', async () => {
        const resultado = await cadastrarUsuario({ ...dadosValidos, nome: 'J' })

        expect(resultado.sucesso).toBe(false)
    })
})

describe('cadastrarUsuario — validação de email', () => {
    it('deve retornar erro com email inválido', async () => {
        const resultado = await cadastrarUsuario({ ...dadosValidos, email: 'email-invalido' })

        expect(resultado.sucesso).toBe(false)
    })
})

describe('cadastrarUsuario — validação de senha', () => {
    it('deve retornar erro com senha sem caractere maiúsculo', async () => {
        const resultado = await cadastrarUsuario({ ...dadosValidos, senha: 'senha@123' })

        expect(resultado.sucesso).toBe(false)
    })

    it('deve retornar erro com senha sem número', async () => {
        const resultado = await cadastrarUsuario({ ...dadosValidos, senha: 'SenhaForte@' })

        expect(resultado.sucesso).toBe(false)
    })

    it('deve retornar erro com senha sem caractere especial', async () => {
        const resultado = await cadastrarUsuario({ ...dadosValidos, senha: 'SenhaForte123' })

        expect(resultado.sucesso).toBe(false)
    })

    it('deve retornar erro com senha muito curta (< 8 chars)', async () => {
        const resultado = await cadastrarUsuario({ ...dadosValidos, senha: 'Ab1@' })

        expect(resultado.sucesso).toBe(false)
    })
})

describe('cadastrarUsuario — validação de telefone', () => {
    it('deve retornar erro com telefone em formato inválido', async () => {
        const resultado = await cadastrarUsuario({ ...dadosValidos, telefone: '123' })

        expect(resultado.sucesso).toBe(false)
    })
})

describe('cadastrarUsuario — erros de banco', () => {
    it('deve retornar erro genérico quando o create falha', async () => {
        prismaMock.usuario.findUnique.mockResolvedValue(null)
        prismaMock.usuario.create.mockRejectedValue(new Error('DB connection failed'))

        const resultado = await cadastrarUsuario(dadosValidos)

        expect(resultado.sucesso).toBe(false)
        if (!resultado.sucesso) {
            expect(resultado.erro).toContain('Erro ao cadastrar usuário')
            expect(resultado.erro).toContain('DB connection failed')
        }
    })

    it('deve retornar erro genérico quando o findUnique falha', async () => {
        prismaMock.usuario.findUnique.mockRejectedValue(new Error('Timeout'))

        const resultado = await cadastrarUsuario(dadosValidos)

        expect(resultado.sucesso).toBe(false)
        if (!resultado.sucesso) {
            expect(resultado.erro).toContain('Erro ao cadastrar usuário')
        }
    })
})

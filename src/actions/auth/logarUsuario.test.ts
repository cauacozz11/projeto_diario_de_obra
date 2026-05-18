import { describe, it, expect, beforeEach, vi } from "vitest"
vi.mock("../../../auth", () => ({ signIn: vi.fn() }));
vi.mock("next-auth", ()=> ({ AuthError: class AuthError extends Error {} }))
import { logarUsuario } from "./logarUsuario"
import { LoginInput } from "@/schemas/login"
import { signIn } from "../../../auth"
import { AuthError } from "next-auth"

const dadosValidos: LoginInput = {
    email: 'teste@gmail.com',
    senha: '1237cygsd****',
}

const dadosInvalidos: LoginInput = {
    email: 'teste@gmail.com',
    senha: '1',
}


beforeEach(() => {
      vi.resetAllMocks()
  })

describe('logarUsuario - sucesso', () => {
     it ('deve logar o usuário com sucesso', async () => {
        vi.mocked(signIn).mockResolvedValue(undefined)

        const resultado = await logarUsuario(dadosValidos)
        expect(resultado.sucesso).toBe(true)
     })
})

describe('logarUsuario - credenciais inválidas', () => {
     it('deve retornar erro de login', async () => {
        vi.mocked(signIn).mockRejectedValue(new AuthError())
        const resultado = await logarUsuario(dadosInvalidos)
        expect(resultado.sucesso).toBe(false)
        expect(signIn).toHaveBeenCalled()
     })
})

describe('logarUsuario - erro inesperado', () => {
     it('deve retornar erro inesperado', async () => {
        vi.mocked(signIn).mockRejectedValue(new Error('erro inesperado'))
        const resultado = await logarUsuario(dadosValidos)
        expect(resultado.sucesso).toBe(false)
        expect(resultado.erro).toContain('Erro ao fazer login')
     })
})

describe('logarUsuario - erro de parse', () => {
     it('deve retornar erro de safeParse', async () => {
        const resultado = await logarUsuario({email: 'testedeemail', senha:''})
        console.log(resultado)
        expect(resultado.sucesso).toBe(false)
        
     })
})
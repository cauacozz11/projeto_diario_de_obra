import { describe, it, expect } from 'vitest'
import { prismaMock } from '@/tests/mocks/prisma'

describe('Usuario', () => {
    it('deve retornar lista de usuarios', async () => {
        prismaMock.usuario.findMany.mockResolvedValue([
            {
                id: '1',
                nome: 'João',
                email: 'joao@email.com',
                telefone: null,
                senha: 'hash',
                createdAt: new Date(),
            },
        ])

        const result = await prismaMock.usuario.findMany()

        expect(Array.isArray(result)).toBe(true)
        expect(result[0].nome).toBe('João')
    })
})

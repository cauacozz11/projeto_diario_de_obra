import { mockDeep, DeepMockProxy } from 'vitest-mock-extended'
import { PrismaClient } from '@/generated/prisma/client'
import { vi } from 'vitest'

export type Context = {
    prisma: DeepMockProxy<PrismaClient>
}

export const prismaMock = mockDeep<PrismaClient>()

vi.mock('@/lib/prisma-client', () => ({
    prisma: prismaMock,
}))

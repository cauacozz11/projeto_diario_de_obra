# Skill — Testes

## Stack
- Jest
- React Testing Library para componentes
- jest-mock-extended para mock do Prisma

## Configuração básica
```ts
// jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  setupFilesAfterFramework: ['<rootDir>/src/tests/setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
```

```ts
// src/tests/setup.ts
import '@testing-library/jest-dom'
```

## Onde ficam os testes
```
src/
├── components/
│   └── UserCard/
│       ├── UserCard.tsx
│       └── UserCard.test.tsx   ← junto ao componente
├── actions/
│   └── createObra.test.ts      ← junto à action
└── tests/
    ├── setup.ts                ← configuração global
    └── mocks/
        └── prisma.ts           ← mock do Prisma
```

## Mock do Prisma
Nunca acesse o banco real em testes — use mock:

```ts
// src/tests/mocks/prisma.ts
import { PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

export type Context = {
  prisma: DeepMockProxy<PrismaClient>
}

export const prismaMock = mockDeep<PrismaClient>()

jest.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}))
```

## Testando Server Actions
```ts
import { prismaMock } from '@/tests/mocks/prisma'
import { createObra } from '@/actions/createObra'

describe('createObra', () => {
  it('cria uma obra com dados válidos', async () => {
    prismaMock.obra.create.mockResolvedValue({ id: '1', nome: 'Obra Teste' })

    const result = await createObra({ nome: 'Obra Teste' })

    expect(prismaMock.obra.create).toHaveBeenCalledTimes(1)
    expect(result).toMatchObject({ nome: 'Obra Teste' })
  })

  it('rejeita dados inválidos', async () => {
    await expect(createObra({ nome: '' })).rejects.toThrow()
    expect(prismaMock.obra.create).not.toHaveBeenCalled()
  })
})
```

## Testando componentes
```ts
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ObraCard } from './ObraCard'

describe('ObraCard', () => {
  it('exibe o nome da obra', () => {
    render(<ObraCard nome="Obra Teste" status="ativo" />)
    expect(screen.getByText('Obra Teste')).toBeInTheDocument()
  })

  it('chama onDelete ao clicar no botão', async () => {
    const onDelete = jest.fn()
    render(<ObraCard nome="Obra Teste" status="ativo" onDelete={onDelete} />)

    await userEvent.click(screen.getByRole('button', { name: /excluir/i }))
    expect(onDelete).toHaveBeenCalledTimes(1)
  })
})
```

## O que testar
- ✅ Server Actions — fluxo feliz e casos de erro
- ✅ Validação Zod — dados válidos e inválidos
- ✅ Componentes com lógica de exibição condicional
- ✅ Componentes com interação do usuário (cliques, inputs)
- ❌ Componentes puramente visuais sem lógica
- ❌ Tipos e interfaces TypeScript
- ❌ Configurações do Next.js/Prisma

## Boas práticas
- Nome do teste descreve o comportamento: 'exibe erro quando nome está vazio'
- Um describe por arquivo, um it por comportamento
- Arrange → Act → Assert — separe as três etapas mentalmente
- Nunca teste implementação, teste comportamento
- Se precisar de muitos mocks para um teste, é sinal que a função faz coisas demais

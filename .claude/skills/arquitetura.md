# Skill — Arquitetura de Software

## Estrutura de pastas (Next.js App Router)

```
src/
├── app/                    # Rotas e páginas (App Router)
│   ├── (auth)/             # Grupo de rotas — não vira segmento de URL
│   ├── api/                # API Routes
│   └── layout.tsx
├── components/
│   ├── ui/                 # Componentes genéricos (botão, input, modal)
│   └── [feature]/          # Componentes específicos de cada feature
├── lib/
│   ├── prisma.ts           # Instância do Prisma (singleton)
│   ├── env.ts              # Validação de variáveis de ambiente
│   └── utils.ts            # Funções utilitárias gerais
├── hooks/                  # Custom hooks React
├── types/                  # Tipos e interfaces globais
└── actions/                # Server Actions organizadas por feature
```

## Princípios
- **Colocação**: mantenha arquivos relacionados juntos. Se um hook só serve a uma feature, coloque dentro da pasta da feature
- **Single responsibility**: cada arquivo faz uma coisa só
- **Sem lógica no componente**: componentes renderizam, lógica fica em hooks ou server actions
- **Evite prop drilling**: use contextos ou server components para passar dados profundos

## Decisões de design
- Prefira Server Components a Client Components
- Prefira Server Actions a API Routes para mutações de formulário
- Prefira composição a herança
- Prefira funções puras e previsíveis

## Nomenclatura
- Componentes: PascalCase (`UserCard.tsx`)
- Hooks: camelCase com prefixo `use` (`useUserData.ts`)
- Server Actions: camelCase com verbo (`createObra.ts`, `updateDiario.ts`)
- Tipos: PascalCase com sufixo quando necessário (`UserWithObras`)
- Constantes: SCREAMING_SNAKE_CASE (`MAX_FILE_SIZE`)

## Quando criar uma abstração
Só crie uma abstração quando o padrão aparecer 3 vezes ou mais. Antes disso, duplicação é aceitável.

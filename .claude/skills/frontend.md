# Skill — Frontend

## Stack
- Next.js 16 com App Router
- TypeScript estrito
- Tailwind CSS

## Componentes
- Sempre crie componentes como funções tipadas: `const Componente = ({ prop }: Props) => {}`
- Defina as props com `interface` acima do componente, nunca inline
- Componentes de UI ficam em `src/components/ui/`
- Componentes de negócio ficam em `src/components/` organizados por feature
- Nunca misture lógica de servidor com lógica de cliente no mesmo componente

## Server vs Client components
- Por padrão, todo componente é Server Component — não adicione `"use client"` sem necessidade
- Use `"use client"` apenas quando precisar de: state, eventos do browser, hooks, refs
- Separe a parte interativa em um componente filho com `"use client"` e mantenha o pai como Server

## Estilo com Tailwind
- Nunca use CSS inline (`style={{}}`) — use classes Tailwind
- Para classes condicionais, use a lib `clsx` ou `cn`
- Ordem das classes: layout → espaçamento → tipografia → cores → estados

## Formulários
- Use `react-hook-form` para formulários complexos
- Validação sempre com `zod`, tanto no cliente quanto no servidor
- Server Actions para submit — evite endpoints REST para formulários simples

## Boas práticas
- Loading states com `loading.tsx` ao lado da page
- Error boundaries com `error.tsx`
- Imagens sempre com o componente `<Image>` do Next.js
- Nunca use `<a>` para navegação interna — use `<Link>` do Next.js

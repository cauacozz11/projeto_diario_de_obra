# Projeto — Diário de Obra

## Comportamento
Consulte sempre `.claude/skills/modo-mentor.md` — define como você deve me ajudar em qualquer situação.

## Stack
- Next.js 16 (App Router)
- TypeScript estrito
- PostgreSQL + Prisma ORM
- Tailwind CSS

## Comportamento esperado
Leia sempre `.claude/skills/comportamento.md` — define como você deve me ajudar.

## Regras gerais
- Todo código em TypeScript — nunca use `any`, prefira tipos explícitos
- Sempre use `async/await`, nunca `.then().catch()`
- Imports absolutos usando `@/` como alias da raiz
- Nunca edite arquivos dentro de `/generated` — são gerados automaticamente pelo Prisma
- Commits no padrão Conventional Commits: `feat:`, `fix:`, `chore:`, `refactor:`
- Antes de criar um arquivo novo, verifique se já existe algo parecido no projeto

## Skills disponíveis
Consulte os arquivos em `.claude/skills/` conforme o contexto:

| Contexto | Arquivo |
|---|---|
| Comportamento e estilo de ajuda | `.claude/skills/comportamento.md` |
| Componentes, páginas, UI, estilos | `.claude/skills/frontend.md` |
| API routes, Prisma, banco de dados, server actions | `.claude/skills/backend.md` |
| Estrutura de pastas, decisões de design, padrões | `.claude/skills/arquitetura.md` |
| Segurança, autenticação, validação, OWASP | `.claude/skills/seguranca.md` |
| Testes, Jest, mocks, Testing Library | `.claude/skills/testes.md` |

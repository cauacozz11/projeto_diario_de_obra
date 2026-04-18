# Skill — Segurança

## Validação de entrada (OWASP A03)
- **Sempre** valide dados externos com Zod antes de qualquer operação
- Nunca confie em dados vindos do cliente — valide no servidor mesmo que já tenha validado no cliente
- Use tipos estritos — nunca `any` ou `unknown` sem narrowing

## Banco de dados
- Nunca construa queries SQL manualmente — use sempre o Prisma (previne SQL Injection)
- Use `select` para expor apenas campos necessários — nunca retorne senha, tokens ou dados sensíveis
- Campos sensíveis no schema Prisma devem ser documentados com comentário `/// SENSITIVE`

## Variáveis de ambiente
- Chaves de API, secrets e credenciais: sempre em variáveis de ambiente, nunca hardcoded
- Nunca faça commit de `.env` — apenas `.env.example` com valores fictícios
- Valide todas as variáveis de ambiente na inicialização da app (`src/lib/env.ts`)

## Headers HTTP
Adicione no `next.config.ts`:
```ts
headers: [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]
```

## Uploads de arquivo
- Valide tipo MIME e extensão no servidor — nunca confie no `Content-Type` do cliente
- Limite o tamanho máximo de upload
- Nunca salve arquivos com o nome original — gere um nome aleatório (UUID)
- Nunca salve uploads dentro de `public/` se forem dados privados

## Autenticação (quando implementar)
- Use uma biblioteca estabelecida: `next-auth` ou `lucia`
- Senhas sempre com `bcrypt` (nunca MD5, SHA1 ou similar)
- Tokens JWT com expiração curta (1h) + refresh token
- Rate limiting em rotas de login

## O que nunca fazer
- Nunca exponha stack traces ou mensagens de erro internas ao cliente
- Nunca logue dados sensíveis (senhas, tokens, CPF)
- Nunca desabilite CSRF protection
- Nunca use `dangerouslySetInnerHTML` com dados do usuário

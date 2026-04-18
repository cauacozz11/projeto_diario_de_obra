# Skill — Backend

## Stack
- Next.js 15 App Router (API Routes + Server Actions)
- Prisma ORM + PostgreSQL
- Zod para validação

## Prisma
- O cliente Prisma fica em `src/lib/prisma.ts` — sempre importe de lá, nunca instancie direto
- Nunca edite arquivos em `/generated` — são gerados pelo `npx prisma generate`
- Após alterar o schema, rode sempre: `npx prisma migrate dev`
- Use `select` para retornar apenas os campos necessários — nunca retorne o objeto inteiro se tiver campos sensíveis
- Transações para operações que afetam múltiplas tabelas: `prisma.$transaction([])`

## API Routes
- Ficam em `src/app/api/[recurso]/route.ts`
- Sempre valide o body da requisição com Zod antes de qualquer operação
- Retorne sempre com `NextResponse.json()` com status code explícito
- Trate erros com try/catch e retorne mensagens genéricas ao cliente (nunca exponha stack trace)

```ts
// Padrão de API route
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = schema.parse(body) // valida com zod
    const result = await prisma.modelo.create({ data })
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
```

## Server Actions
- Use para formulários e mutações simples
- Sempre adicione `"use server"` no topo
- Valide com Zod antes de qualquer operação no banco
- Revalide cache com `revalidatePath()` após mutações

## Variáveis de ambiente
- Nunca use `process.env` diretamente no código — crie um `src/lib/env.ts` que valida com Zod
- Variáveis do servidor nunca devem estar expostas ao cliente (sem prefixo `NEXT_PUBLIC_`)

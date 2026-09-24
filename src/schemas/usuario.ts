import { z } from "zod"

export const schemaUsuario = z.object({
    nome: z.string().min(2, "Nome é obrigatório!").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras!"),
    email: z.email("E-mail inválido!"),
    telefone: z.string()
    .regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, "Telefone inválido!")
    .optional(),
    senha: z.string().regex(/[A-Z]/, "A senha deve conter no mínimo um carater maiúsculo!")
    .regex(/[0-9]/, "A senha deve conter no mínimo um número!")
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter no mínimo um carater especial!").min(8, "A senha deve conter no mínimo 8 caractéres!")
})

export type UsuarioInput = z.infer<typeof schemaUsuario>
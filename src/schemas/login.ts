import { z } from "zod"

export const schemaLogin = z.object({
    email: z.email("E-mail inválido!"),
    senha: z.string().min(1, "A senha deve conter no mínimo 1 caracter!")
})

export type LoginInput = z.infer<typeof schemaLogin>
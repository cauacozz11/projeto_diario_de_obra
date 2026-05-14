"use server"

import { schemaLogin, LoginInput } from "@/schemas/login"
import { AuthError } from "next-auth"
import { signIn } from "../../../auth"

type Resposta = 
    | { sucesso: true }
    | { sucesso: false, erro: unknown}

export async function logarUsuario(dados: LoginInput): Promise<Resposta> {
    try {
        const resultado = schemaLogin.safeParse(dados)

        if (!resultado.success) {
            return { sucesso: false, erro: resultado.error.issues } 
        }

        const { email: emailRaw, senha} = resultado.data
        const email = emailRaw.toLowerCase().trim()

        await signIn("credentials", {
            email, 
            senha,
            redirect: false
        })
        return { sucesso: true }

    } catch (error) {
        if (error instanceof AuthError) {
            return { sucesso: false, erro: "Email ou senha incoretos" }
        }
        const mensagem = error instanceof Error ? error.message: String(error)
        return { sucesso: false, erro: `Erro ao fazer login: ${mensagem}` }
    }
}
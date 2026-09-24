"use server"

import { prisma } from "@/lib/prisma"
import { schemaUsuario, UsuarioInput } from "@/schemas/usuario"
import { Usuario } from "@/generated/prisma/client"
import bcrypt from "bcryptjs"



type Resposta =
    | { sucesso: true; usuario: Omit<Usuario, "senha"> }
    | { sucesso: false; erro: unknown }

export async function cadastrarUsuario(dados: UsuarioInput): Promise<Resposta> {
    try {
        const resultado = schemaUsuario.safeParse(dados)

        if (!resultado.success) {
            return { sucesso: false, erro: resultado.error.issues }
        }

        const { nome, email: emailRaw, senha, telefone } = resultado.data
        const email = emailRaw.toLowerCase().trim()

        const emailExistente = await prisma.usuario.findUnique({
            where: { email },
        })

        if (emailExistente) {
            return { sucesso: false, erro: "E-mail já cadastrado" }
        }

        if (telefone != undefined) {
            const telefoneExistente = await prisma.usuario.findFirst({
                    where: { telefone },
            })
            if (telefoneExistente) {
                return { sucesso: false, erro: "Telefone já cadastrado" }
            }
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const novoUsuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                telefone,
                senha: senhaCriptografada,
            },
        })

        const { senha: _, ...usuarioSemSenha } = novoUsuario

        return { sucesso: true, usuario: usuarioSemSenha }
    } catch (error) {
        const mensagem = error instanceof Error ? error.message: String(error)
        return { sucesso: false, erro: `Erro ao cadastrar usuário: ${mensagem}` }
    }
}
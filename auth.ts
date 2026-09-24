import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt"},
    providers: [Credentials({
        credentials: {
            email: {},
            senha: {}
        },
        async authorize(credentials) {
            const { email, senha } = credentials as { email: string, senha: string }

            const usuario = await prisma.usuario.findUnique({
                where: { email }
            })

            if (!usuario || !usuario.senha) return null

            const senhaCorreta = await bcrypt.compare(
                senha,
                usuario.senha
            )

            if (!senhaCorreta) return null

            return {
                id: usuario.id,
                name: usuario.nome,
                email: usuario.email
            }
        }
    })]
})



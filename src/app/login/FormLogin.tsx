"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schemaLogin, LoginInput } from "@/schemas/login"
import useCampoComErro from "@/hooks/useCampoComErro"
import { logarUsuario } from "@/actions/auth/logarUsuario"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Campo from "@/components/ui/Campo"
import Botao from "@/components/ui/Botao"
import MensagemErro from "@/components/ui/MensagemErro"

export default function FormLogin() {
    const Router = useRouter()
    const [ erroLogin, setErroLogin] = useState<string | null>(null)

    const { register, watch, clearErrors, handleSubmit ,formState: { errors, touchedFields, isSubmitted, isSubmitting }
    } = useForm<LoginInput>({
    resolver: zodResolver(schemaLogin),
    mode: 'onBlur',
    shouldFocusError: false
    })

    const campoEmail = useCampoComErro<LoginInput>("email", {
        register, watch, clearErrors, errors, touchedFields, isSubmitted
    })

    const campoSenha = useCampoComErro<LoginInput>("senha", {
        register, watch, clearErrors, errors, touchedFields, isSubmitted
    })

    async function onSubmit(dados: LoginInput){
        setErroLogin(null)

        const resultado = await logarUsuario(dados)


        if (resultado.sucesso) {
            Router.push("/home")
        } else {
            const mensagem = typeof resultado.erro === "string"
            ? resultado.erro
            : "Não foi possível fazer login. Tente Novamente."
        setErroLogin(mensagem)
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <header className="flex flex-col gap-2">
                <h1 className="font-display text-3xl font-semibold tracking-tight text-balance">
                    Entre na sua conta
                </h1>
                <p className="text-sm text-pretty text-muted">
                    Acompanhe o diário das suas obras de onde estiver.
                </p>
            </header>

            {erroLogin && <MensagemErro mensagem={erroLogin} />}

            <div className="flex flex-col gap-5">
                <Campo
                    {...campoEmail.handlers}
                    id="email"
                    type="email"
                    label="E-mail"
                    placeholder="voce@empresa.com.br"
                    autoComplete="email"
                    erro={campoEmail.mostrarErro ? campoEmail.mensagem : undefined}
                />

                <Campo
                    {...campoSenha.handlers}
                    id="senha"
                    type="password"
                    label="Senha"
                    placeholder="Sua senha"
                    autoComplete="current-password"
                    erro={campoSenha.mostrarErro ? campoSenha.mensagem : undefined}
                />
            </div>

            <div className="flex flex-col gap-5">
                <Botao type="submit" carregando={isSubmitting}>
                    {isSubmitting ? "Entrando…" : "Entrar"}
                </Botao>

                <p className="text-center text-sm text-muted">
                    Ainda não tem conta?{" "}
                    <Link
                        href="/cadastro"
                        className="rounded-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        Criar conta
                    </Link>
                </p>
            </div>
        </form>
    )
}

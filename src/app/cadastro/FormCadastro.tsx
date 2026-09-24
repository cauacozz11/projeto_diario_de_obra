"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schemaUsuario, UsuarioInput } from "@/schemas/usuario"
import useCampoComErro from "@/hooks/useCampoComErro"
import { cadastrarUsuario } from "@/actions/auth/cadastrarUsuario"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Campo from "@/components/ui/Campo"
import Botao from "@/components/ui/Botao"
import MensagemErro from "@/components/ui/MensagemErro"


export default function FormCadastro() {
    const Router = useRouter()
    const [erroCadastro, setErroCadastro] = useState<string | null>(null)

    const { register, watch, clearErrors, handleSubmit ,formState: { errors, touchedFields, isSubmitted, isSubmitting }
    } = useForm<UsuarioInput>({
    resolver: zodResolver(schemaUsuario),
    mode: 'onBlur',
    shouldFocusError: false
    })
    const campoNome = useCampoComErro<UsuarioInput>('nome', {
        register, watch, clearErrors, errors, touchedFields, isSubmitted})

    const campoEmail = useCampoComErro<UsuarioInput>("email", {
        register, watch, clearErrors, errors, touchedFields, isSubmitted
    })

    const campoTelefone = useCampoComErro<UsuarioInput>("telefone", {
        register, watch, clearErrors, errors, touchedFields, isSubmitted
    })

    const campoSenha = useCampoComErro<UsuarioInput>("senha", {
        register, watch, clearErrors, errors, touchedFields, isSubmitted
    })

    async function onSubmit(dados: UsuarioInput){
        setErroCadastro(null)
        const resultado = await cadastrarUsuario(dados)

        if (resultado.sucesso) {
            Router.push("/login")
        } else {
            const mensagem = typeof resultado.erro === "string"
                ? resultado.erro
                : "Não foi possível cadastrar. Tente novamente."
            setErroCadastro(mensagem)
        }
    }

   return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <header className="flex flex-col gap-2">
                <h1 className="font-display text-3xl font-semibold tracking-tight text-balance">
                    Crie sua conta
                </h1>
                <p className="text-sm text-pretty text-muted">
                    Comece a registrar o dia a dia da obra em menos de um minuto.
                </p>
            </header>

            {erroCadastro && <MensagemErro mensagem={erroCadastro} />}

            <div className="flex flex-col gap-5">
                <Campo
                    {...campoNome.handlers}
                    id="nome"
                    type="text"
                    label="Nome completo"
                    placeholder="Como você quer ser chamado"
                    autoComplete="name"
                    erro={campoNome.mostrarErro ? campoNome.mensagem : undefined}
                />

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
                    {...campoTelefone.handlers}
                    id="telefone"
                    type="tel"
                    inputMode="numeric"
                    label="Telefone"
                    opcional
                    placeholder="11999999999"
                    maxLength={11}
                    autoComplete="tel-national"
                    erro={campoTelefone.mostrarErro ? campoTelefone.mensagem : undefined}
                />

                <Campo
                    {...campoSenha.handlers}
                    id="senha"
                    type="password"
                    label="Senha"
                    placeholder="Crie uma senha"
                    autoComplete="new-password"
                    dica="Mínimo de 8 caracteres, com letra maiúscula, número e símbolo."
                    erro={campoSenha.mostrarErro ? campoSenha.mensagem : undefined}
                />
            </div>

            <div className="flex flex-col gap-5">
                <Botao type="submit" carregando={isSubmitting}>
                    {isSubmitting ? "Criando conta…" : "Criar conta"}
                </Botao>

                <p className="text-center text-sm text-muted">
                    Já tem conta?{" "}
                    <Link
                        href="/login"
                        className="rounded-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        Entrar
                    </Link>
                </p>
            </div>
        </form>
   )

}

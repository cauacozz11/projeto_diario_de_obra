import { ReactNode } from "react"
import Marca from "@/components/auth/Marca"
import PreviaRegistro from "@/components/auth/PreviaRegistro"

interface LayoutAutenticacaoProps {
    children: ReactNode
}

const LayoutAutenticacao = ({ children }: LayoutAutenticacaoProps) => {
    return (
        <div className="grid min-h-dvh lg:grid-cols-2">
            <aside className="relative hidden flex-col justify-between overflow-hidden bg-panel p-12 text-panel-foreground lg:flex">
                <div className="bg-blueprint absolute inset-0" aria-hidden />

                <Marca className="relative" />

                <div className="relative flex max-w-md flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-display text-4xl leading-tight font-semibold tracking-tight text-balance">
                            O diário da obra, registrado enquanto ela acontece.
                        </h2>
                        <p className="text-pretty text-panel-muted">
                            Fale, fotografe ou escreva. Cada registro do canteiro vira um relatório
                            organizado para toda a equipe.
                        </p>
                    </div>
                    <PreviaRegistro />
                </div>

                <p className="relative text-sm text-panel-muted">© 2026 Voicivil</p>
            </aside>

            <main className="flex flex-col gap-10 px-4 py-8 sm:px-8 lg:px-12">
                <Marca className="lg:hidden" />
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-sm">{children}</div>
                </div>
            </main>
        </div>
    )
}

export default LayoutAutenticacao

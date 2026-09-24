"use client"

import { InputHTMLAttributes, forwardRef, useId, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface CampoProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    erro?: string
    dica?: string
    opcional?: boolean
}

const Campo = forwardRef<HTMLInputElement, CampoProps>(
    ({ label, erro, dica, opcional = false, id, type, className, ...resto }, ref) => {
        const idGerado = useId()
        const idCampo = id ?? idGerado
        const idDescricao = `${idCampo}-descricao`
        const descricao = erro || dica

        const [senhaVisivel, setSenhaVisivel] = useState(false)
        const ehSenha = type === "password"

        return (
            <div className="flex flex-col gap-2">
                <label
                    htmlFor={idCampo}
                    className="flex items-baseline justify-between text-sm font-medium text-foreground"
                >
                    {label}
                    {opcional && <span className="text-xs font-normal text-muted">Opcional</span>}
                </label>

                <div className="relative">
                    <input
                        {...resto}
                        id={idCampo}
                        ref={ref}
                        type={ehSenha && senhaVisivel ? "text" : type}
                        aria-invalid={erro ? true : undefined}
                        aria-describedby={descricao ? idDescricao : undefined}
                        className={cn(
                            "h-11 w-full rounded-md border border-border-strong bg-surface px-3.5 text-base text-foreground shadow-xs outline-none transition-[border-color,box-shadow] duration-150 sm:text-sm",
                            "placeholder:text-muted/70 hover:border-muted/60",
                            "focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15",
                            "aria-invalid:border-danger aria-invalid:focus-visible:ring-danger/15",
                            ehSenha && "pr-12",
                            className
                        )}
                    />

                    {ehSenha && (
                        <button
                            type="button"
                            onClick={() => setSenhaVisivel((visivel) => !visivel)}
                            aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
                            aria-pressed={senhaVisivel}
                            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-muted transition-colors duration-150 hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary"
                        >
                            {senhaVisivel
                                ? <EyeOff className="size-4" aria-hidden />
                                : <Eye className="size-4" aria-hidden />}
                        </button>
                    )}
                </div>

                {descricao && (
                    <p id={idDescricao} className={cn("text-xs text-pretty", erro ? "text-danger" : "text-muted")}>
                        {descricao}
                    </p>
                )}
            </div>
        )
    }
)

Campo.displayName = "Campo"

export default Campo

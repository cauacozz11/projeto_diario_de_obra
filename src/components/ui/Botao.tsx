import { ButtonHTMLAttributes } from "react"
import { LoaderCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    carregando?: boolean
}

const Botao = ({ className, children, carregando = false, disabled, ...resto }: BotaoProps) => {
    return (
        <button
            {...resto}
            disabled={disabled || carregando}
            aria-busy={carregando || undefined}
            className={cn(
                "inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-[background-color,translate] duration-150",
                "hover:bg-primary-hover active:translate-y-px",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "disabled:cursor-not-allowed disabled:opacity-70",
                className
            )}
        >
            {carregando && <LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden />}
            {children}
        </button>
    )
}

export default Botao

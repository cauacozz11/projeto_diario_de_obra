import Link from "next/link"
import { AudioLines } from "lucide-react"
import { cn } from "@/lib/utils"

interface MarcaProps {
    className?: string
}

const Marca = ({ className }: MarcaProps) => {
    return (
        <Link
            href="/"
            className={cn(
                "inline-flex w-fit items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                className
            )}
        >
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <AudioLines className="size-5" aria-hidden />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">Voicivil</span>
        </Link>
    )
}

export default Marca

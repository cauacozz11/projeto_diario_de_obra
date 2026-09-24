import { CircleAlert } from "lucide-react"

interface MensagemErroProps {
    mensagem: string
}

const MensagemErro = ({ mensagem }: MensagemErroProps) => {
    return (
        <div
            role="alert"
            className="flex items-start gap-3 rounded-md border border-danger/25 bg-danger-soft px-3.5 py-3 text-sm text-danger"
        >
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            <p className="text-pretty">{mensagem}</p>
        </div>
    )
}

export default MensagemErro

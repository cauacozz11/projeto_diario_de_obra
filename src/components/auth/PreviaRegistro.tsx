import { Camera, Mic, Sun, Users } from "lucide-react"

const ALTURAS_ONDA = [
    "h-2", "h-4", "h-6", "h-3", "h-7", "h-5", "h-8", "h-4", "h-6", "h-2",
    "h-5", "h-7", "h-3", "h-6", "h-4", "h-8", "h-5", "h-3", "h-6", "h-2",
]

const DETALHES = [
    { icone: Camera, texto: "3 fotos" },
    { icone: Sun, texto: "Ensolarado" },
    { icone: Users, texto: "8 na equipe" },
]

const PreviaRegistro = () => {
    return (
        <figure
            aria-label="Exemplo de registro no diário de obra"
            className="flex flex-col gap-4 rounded-xl border border-panel-line bg-panel-raised p-5 shadow-2xl shadow-black/30"
        >
            <div className="flex items-center justify-between text-xs text-panel-muted">
                <span className="inline-flex items-center gap-2">
                    <span className="size-2 rounded-full bg-accent" aria-hidden />
                    Residencial Aurora
                </span>
                <time className="tabular-nums">Hoje, 07:42</time>
            </div>

            <p className="font-display text-lg font-medium">Concretagem da laje — 3º pavimento</p>

            <div className="flex items-center gap-3 rounded-lg bg-panel p-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-panel">
                    <Mic className="size-4" aria-hidden />
                </span>
                <div className="flex h-8 flex-1 items-center gap-1" aria-hidden>
                    {ALTURAS_ONDA.map((altura, indice) => (
                        <span key={indice} className={`w-1 rounded-full bg-panel-muted/60 ${altura}`} />
                    ))}
                </div>
                <span className="text-xs tabular-nums text-panel-muted">0:48</span>
            </div>

            <blockquote className="text-sm text-pretty text-panel-muted">
                “Chegaram 12 m³ de concreto às 7h. Vibração concluída no trecho norte, sem ocorrências.”
            </blockquote>

            <figcaption className="flex flex-wrap gap-2">
                {DETALHES.map(({ icone: Icone, texto }) => (
                    <span
                        key={texto}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-panel-line px-2 py-1 text-xs text-panel-muted"
                    >
                        <Icone className="size-3.5" aria-hidden />
                        {texto}
                    </span>
                ))}
            </figcaption>
        </figure>
    )
}

export default PreviaRegistro

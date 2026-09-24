import type { Metadata } from "next"
import LayoutAutenticacao from "@/components/auth/LayoutAutenticacao"
import FormCadastro from "./FormCadastro"

export const metadata: Metadata = {
    title: "Criar conta",
}

export default function PaginaCadastro() {
    return (
        <LayoutAutenticacao>
            <FormCadastro />
        </LayoutAutenticacao>
    )
}

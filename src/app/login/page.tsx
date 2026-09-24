import type { Metadata } from "next"
import LayoutAutenticacao from "@/components/auth/LayoutAutenticacao"
import FormLogin from "./FormLogin"

export const metadata: Metadata = {
    title: "Entrar",
}

export default function PaginaLogin() {
    return (
        <LayoutAutenticacao>
            <FormLogin />
        </LayoutAutenticacao>
    )
}

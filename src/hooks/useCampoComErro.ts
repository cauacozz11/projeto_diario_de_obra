import { useState } from "react";
import { FieldValues, Path, UseFormRegister, UseFormWatch, UseFormClearErrors, FieldErrors } from "react-hook-form";


interface CampoComErroProp<T extends FieldValues>{
    register: UseFormRegister<T>,
    watch: UseFormWatch<T>,
    clearErrors: UseFormClearErrors<T>,
    errors: FieldErrors<T>,
    touchedFields: Partial<Record<keyof T, boolean>>,
    isSubmitted: boolean
}

export default function useCampoComErro<T extends FieldValues>(
    nomeCampo: Path<T>,
    { register, watch, clearErrors, touchedFields, errors, isSubmitted }: CampoComErroProp<T>
) {
    const [emFoco, setEmFoco] = useState(false)

    const { onBlur: onBlurPadrao, onChange: onChangePadrao, ...resto } = register(nomeCampo)

    const handlers = { 
        onFocus: () => setEmFoco(true),
        onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
            setEmFoco(false)
            onBlurPadrao(e)
            
        },
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            onChangePadrao(e)
            if (!e.target.value) clearErrors(nomeCampo)
        },
        ...resto
   }
   
   const mostrarErro = !!(
        errors[nomeCampo] &&
        (touchedFields[nomeCampo] || isSubmitted) &&
        (watch(nomeCampo)) &&
        !emFoco
    )

    const mensagem = errors[nomeCampo]?.message ?? ""

    return {
        handlers,
        mostrarErro, 
        mensagem
    }
}
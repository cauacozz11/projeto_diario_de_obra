# Hook `useCampoComErro`

## Contexto

Durante o desenvolvimento do `FormCadastro.tsx`, chegamos à necessidade de criar um hook customizado para encapsular a lógica de validação de campos com o `react-hook-form`.

O problema que motivou a criação: cada campo precisava de `onFocus`, `onBlur` e `onChange` customizados para controlar quando o erro aparece, o que tornava o componente muito extenso com 4 campos.

## Comportamento esperado do campo

- Usuário clica no input → nenhuma mensagem de erro
- Usuário digita algo inválido e sai do campo → erro aparece
- Usuário volta a digitar → erro some enquanto digita
- Usuário apaga tudo → erro some
- Usuário corrige e sai do campo → erro some

## O que foi decidido

- O `useForm` **fica no componente** — ele é o gerente de todo o formulário e precisa ser único
- O hook recebe as funções do `useForm` + o nome do campo
- O hook cria internamente o `useState` de foco (específico de cada campo)

## Assinatura do hook (a implementar)

```ts
function useCampoComErro(
  nomeCampo: keyof UsuarioInput,
  { register, watch, clearErrors, touchedFields, errors }: CampoComErroProps
) {
  return {
    handlers,   // onChange, onBlur, onFocus prontos para o input
    mostrarErro, // boolean — se deve exibir a mensagem
    mensagem,    // string — texto do erro
  }
}
```

## Uso esperado no componente

```tsx
const emailField = useCampoComErro("email", { register, watch, clearErrors, touchedFields, errors })

<input {...emailField.handlers} type="email" placeholder="Email" />
{emailField.mostrarErro && <span>{emailField.mensagem}</span>}
```

## Próximos passos

1. Criar o arquivo `src/hooks/useCampoComErro.ts`
2. Definir o tipo `CampoComErroProps` com as funções do `useForm`
3. Implementar o corpo do hook com o `useState` de foco e os handlers
4. Substituir os 4 inputs do `FormCadastro.tsx` para usar o hook
5. Testar os 4 campos com os cenários descritos acima
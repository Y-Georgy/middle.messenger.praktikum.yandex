import { TCurrentRecipent, TRecipient } from "."

type TData = {
  message?: string | undefined
}

export const getProps = (errors: TData, isDisabledFormMessage: boolean, recipients: TRecipient[], currentRecipent: TCurrentRecipent) => ({
  recipients: recipients,
  currentRecipent: currentRecipent,
  error: errors.message,
  isDisabledFormMessage: isDisabledFormMessage
})
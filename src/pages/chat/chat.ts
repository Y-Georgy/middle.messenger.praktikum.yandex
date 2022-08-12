export const getProps = (errors, isDisabledFormMessage, recipients, currentRecipent) => ({
  recipients: recipients,
  currentRecipent: currentRecipent,
  error: errors.message,
  isDisabledFormMessage: isDisabledFormMessage
})
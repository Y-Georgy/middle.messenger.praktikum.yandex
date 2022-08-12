export const isValidLogin = (value: string): string => {
  if (value.length < 3 || value.length > 20) return 'Допустимо от 3 до 20 символов'
  if (/^[0-9]+$/.test(value)) return 'Не может содержать только цифры'
  if (!/^[a-zA-Z0-9\_\-]+$/.test(value)) return 'Допустимы только латинские буквы, дефис и нижнее подчеркивание'
  return ''
}

export const isValidMessage = (value: string): string => {
  if (value.length === 0) return 'Сообщение не может быть пустым'
  return '';
}

export const isValidEmail = (value: string): string => {
  // const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return 'Не корретный e-mail'
  return ''
}

export const isValidPhone = (value: string): string => {
  if (value.length < 10 || value.length > 15) return 'Допустимо от 10 до 15 цифр'
  if (!/^\+?[0-9]+$/.test(value)) return 'Только цифры, может начинается с плюса'
  return ''
}

export const isValidPassword = (value: string): string => {
  if (value.length < 8 || value.length > 40) return 'Допустимо от 8 до 40 символов'
  if (!/[А-ЯA-Z]/.test(value)) return 'Заглавная буква обязательна'
  if (!/[0-9]/.test(value)) return 'Хотя бы одна цифра обязательна'
  return ''
}

export const isValidName = (value: string) => {
  if (!/^[А-ЯA-Z]/.test(value)) return 'Первая буква должна быть заглавной'
  if (!/^[a-zA-Zа-яёА-ЯЁ\-]+$/.test(value)) return 'Только кириллица, латиница и дефис'
  return ''
}

export function getFormData( event ) {
  const inputsNodeList = event.target.querySelectorAll('input');
  const inputs: HTMLInputElement[] = Array.from(inputsNodeList);
  const formValues: Record<string, string> = {};
  inputs.forEach(input => {
    formValues[input.name] = input.value        
  })
  return formValues;
};

export function isDisableForm(errors: Record<string, string>) {
  return Object.values(errors).some(err => err.length !== 0)
}

export function setErrors(oldErrors, newValues) {
  Object.keys(newValues).forEach(key => {
    if (key === 'oldPassword') {
      oldErrors[key] = isValidPassword(newValues[key])
    } else if (key === 'newPassword') {
      oldErrors[key] = isValidPassword(newValues[key])
    } else if (key === 'repeatPassword') {
      oldErrors[key] = isValidPassword(newValues[key])
    } else if (key === 'email') {
      oldErrors[key] = isValidEmail(newValues[key])
    } else if (key === 'login') {
      oldErrors[key] = isValidLogin(newValues[key])
    } else if (key === 'first_name') {
      oldErrors[key] = isValidName(newValues[key])
    } else if (key === 'second_name') {
      oldErrors[key] = isValidName(newValues[key])
    } else if (key === 'phone') {
      oldErrors[key] = isValidPhone(newValues[key])
    } else if (key === 'message') {
      oldErrors[key] = isValidMessage(newValues[key])
    }
  });
}
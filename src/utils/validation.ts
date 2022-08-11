const nameValidation = {
  regex: /^[А-ЯA-Z][a-zA-Zа-яёА-ЯЁ\-]*$/g,
  errorMessage: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)'
}

const login = {
  errorMessage: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)'
}

export const isValidName = (value: string) => {
  if (/[a-zA-Zа-яёА-ЯЁ\-]*/.test(value)) return 'Только кириллица, латиница и дефис'
  if (/^[А-ЯA-Z]/.test(value)) return 'Первая буква должна быть заглавной'
  return ''
}

export const isValidLogin = (value: string): string => {
  if (value.length < 3 && value.length > 20) return 'Допустимо от 3 до 20 символов'
  if (/[0-9]*/i.test(value)) return 'Не может содержать только цифры'
  if (!/[A-Z0-9]*/i.test(value)) return 'Допустимы только латинские буквы'
  return ''
}
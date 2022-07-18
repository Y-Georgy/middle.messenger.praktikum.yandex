import authInput from './authInput.hbs'
import './authInput.scss'

export const authInput = (name, label = '', value = '', errorText = '', type = 'text' ) => (
  authInput({ name, label, value, errorText, type})
);
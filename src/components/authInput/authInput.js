import authInput from './authInput.hbs'
import './authInput.scss'

export default (name, label = '', value = '', errorText = '', type = 'text' ) => (
  authInput({ name, label, value, errorText, type})
);
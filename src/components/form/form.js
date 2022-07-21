import form from './form.hbs'
import './form.scss'

export default ( name, content ) => (
  form({ name, content })
);
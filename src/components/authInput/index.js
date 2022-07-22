// import Handlebars from 'handlebars';
import authInput from './authInput.hbs'
import * as styles from './authInput.module.scss'

export default (props) => (
  authInput({...props, styles })
);

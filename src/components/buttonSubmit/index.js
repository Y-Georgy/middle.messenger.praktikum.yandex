import template from "./template.hbs"
import styles from './styles.module.scss';

export default (props) => template({...props, styles});
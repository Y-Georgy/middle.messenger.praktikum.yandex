import template from "./template.hbs";
import * as styles from "./styles.module.scss";

export default (props) => template({ ...props, styles });

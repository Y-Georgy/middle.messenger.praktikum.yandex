import template from "./template.hbs"
import styles from "./styles.module.scss";

export default ( content ) => (
  template({ content, styles })
);
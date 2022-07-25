import template from "./template.hbs"
import * as styles from "./styles.module.scss";

export default ( content ) => (
  template({ content, styles })
);
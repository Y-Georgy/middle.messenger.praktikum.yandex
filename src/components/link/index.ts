const template = require("./template.hbs");
import Component from "../../modules/Core/Component"
import styles from "./styles.module.scss";
type TProps = {
  href: string,
  text: string
}
class Link extends Component<TProps> {
  constructor(props: TProps) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default Link;

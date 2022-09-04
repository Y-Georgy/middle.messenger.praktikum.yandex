import template from "./template.hbs";
import Component from "../../modules/Core/Component"
import * as styles from "./styles.module.scss";

type TProps = {
  href: string,
  text: string
}
class Link extends Component {
  constructor(props: TProps) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default Link;
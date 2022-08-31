import template from "./template.hbs";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";

type TProps = {
  content: unknown
}
class Popup extends Component {
  constructor(props: TProps) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default Popup;
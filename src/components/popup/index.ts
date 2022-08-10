import template from "./template.hbs";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";

class Popup extends Component {
  constructor(props) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default Popup;
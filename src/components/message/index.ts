import template from "./template.hbs";
import * as styles from "./styles.module.scss";
import Component from "../../utils/Component";

class Message extends Component {
  constructor(props) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default Message;

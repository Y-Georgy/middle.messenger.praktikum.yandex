import template from "./template.hbs";
import Component from "../../utils/Component"
import * as styles from "./styles.module.scss";

class Link extends Component {
  constructor(props) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default Link;
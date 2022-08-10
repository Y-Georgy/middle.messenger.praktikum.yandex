import template from "./template.hbs";
import Component from "../../utils/Component"
import * as styles from "./styles.module.scss";

class Input extends Component {
  props: {
    errorText: string,
    name: string,
    type: string,
    value: string,
    label: string,
    styles: {
      authInput:string
    }
  };
  constructor(props) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default Input;
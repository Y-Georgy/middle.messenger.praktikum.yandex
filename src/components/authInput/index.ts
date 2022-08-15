import template from "./template.hbs";
import Component from "../../utils/Component"
import * as styles from "./styles.module.scss";

type TProps = {
  errorText: string,
  name: string,
  type: string,
  value: string,
  label: string,
  styles: {
    input:string
  }
};

class Input extends Component {
  constructor(props) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default Input;
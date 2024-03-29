import template from "./template.hbs";
import * as styles from "./styles.module.scss";
import Component from "../../modules/Core/Component"

type Props = {
  text: string,
  disabled: boolean,
  form?: string
}
class Button extends Component<Props> {
  constructor(props: Props) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default Button;

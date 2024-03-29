import template from "./template.hbs";
import Component from "../../../modules/Core/Component"
import ButtonSubmit from "../../../components/buttonSubmit";
import * as styles from "./styles.module.scss";

type TProps = {
  button: ButtonSubmit
}
class PopupContent extends Component<TProps> {
  constructor(props: TProps) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default PopupContent;

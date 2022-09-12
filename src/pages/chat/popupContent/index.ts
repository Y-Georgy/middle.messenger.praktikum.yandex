import template from "./template.hbs";
import Component from "../../../modules/Core/Component"
import ButtonSubmit from "../../../components/buttonSubmit";
import * as styles from "./styles.module.scss";
import Input from "../../../components/authInput";


type TProps = {
  title: string,
  formId: string,
  input: Input,
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

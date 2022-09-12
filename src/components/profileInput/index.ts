import template from "./template.hbs";
import Component from "../../modules/Core/Component";
import * as styles from "./styles.module.scss";

type TProps = {
  name: string,
  label: string,
  value?: string,
  type: string,
  disabled: boolean,
  error?: string
}
class ProfileInput extends Component {
  constructor(props: TProps) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default ProfileInput;

import template from "./template.hbs";
import Component from "../../modules/Core/Component"
import * as styles from "./styles.module.scss";

export type TToolTip = {
  isSuccess: boolean,
  isDisplay: boolean,
  text: string
}
class ToolTip extends Component<TToolTip> {
  constructor(props: TToolTip) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default ToolTip;

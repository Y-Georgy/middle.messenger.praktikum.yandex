const template = require("./template.hbs");
import Component from "../../modules/Core/Component"
import styles from "./styles.module.scss";
export type TToolTip = {
  isSuccess: boolean,
  isDisplay: boolean,
  text: string
}
export class ToolTip extends Component<TToolTip> {
  constructor(props: TToolTip) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

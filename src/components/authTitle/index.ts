const template = require("./template.hbs");
import styles from "./styles.module.scss";import Component from "../../modules/Core/Component";

type TProps = {
  title: string;
}
class Title extends Component<TProps> {
  constructor(props: TProps) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default Title;

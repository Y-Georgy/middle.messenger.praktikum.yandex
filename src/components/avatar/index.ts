const template = require("./template.hbs");
import styles from "./styles.module.scss";import Component from "../../modules/Core/Component";

type TProps = {
  imageLink: string;
}
class Avatar extends Component<TProps> {
  constructor(props: TProps) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default Avatar;

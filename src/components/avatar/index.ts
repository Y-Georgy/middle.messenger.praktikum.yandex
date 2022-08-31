import template from "./template.hbs";
import * as styles from "./styles.module.scss";
import Component from "../../utils/Component";

type TProps = {
  imageLink: string;
}
class Avatar extends Component {
  constructor(props: TProps) {
    super(props, "div");
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default Avatar;

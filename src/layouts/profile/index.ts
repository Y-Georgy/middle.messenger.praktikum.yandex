import template from "./template.hbs";
import Component from "../../modules/Core/Component";
import * as styles from "./styles.module.scss";

type TProps = {
  events?: Record<string, (event: Event) => void>
  content: unknown;
}
class ProfileLayout extends Component<TProps> {
  constructor(props: TProps) {
    super(props, "div", {
      class: styles.profileLayout
    });
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default ProfileLayout;

import template from "./template.hbs";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";

class ProfileLayout extends Component {
  constructor(props) {
    super(props, "div", {
      class: styles.profileLayout
    });
  }

  render() {
    return template({ ...this.props, styles });
  }
}

export default ProfileLayout;
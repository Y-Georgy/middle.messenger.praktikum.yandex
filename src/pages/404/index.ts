import template from "./template.hbs";
import Link from "../../components/link";
import * as styles from "./styles.module.scss";
import Component from "../../utils/Component";

class Page404 extends Component {
  constructor(props) {
    super(props, "section", {
      class: styles.section
    });
  }

  render() {
    return template({ ...this.props, styles });
  }
}

const page404 = new Page404({
  link: new Link({
    href: "/",
    text: "Назад к чатам",
  }).render()
});

export default page404;

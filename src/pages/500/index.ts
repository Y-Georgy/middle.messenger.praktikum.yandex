import template from "./template.hbs";
import Link from "../../components/link";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";

class Page500 extends Component {
  constructor(props) {
    super(props, "section", {
      class: styles.section
    });
  }

  render() {
    return template({ ...this.props, styles });
  }
}

const page500 = new Page500({
  link: new Link({
    href: "/",
    text: "Назад к чатам",
  }).render()
});

export default page500;

import template from "./template.hbs";
import * as styles from "./styles.module.scss";
import Component from "../../modules/Core/Component";
import { TUnknownFuncVoid } from "../../types/types";
import { Router } from "../../modules/Router/Router";

type Tprops = {
  events: Record<string, TUnknownFuncVoid>,
}

const page404 = () => {
  const router = new Router();

  class Page404 extends Component {
    constructor(props: Tprops) {
      super(props, "section", {
        class: styles.section
      });
    }

    render() {
      return template({ ...this.props, styles });
    }
  }

  function handleClick(event: Event) {
    const target = event.target as HTMLElement
    if (target.id === 'link-chat') {
      event.preventDefault();
      router.go("/");
    }
  }

  const page = new Page404({
    events: {
      click: handleClick
    },
  });

  return page;
}

export default page404;

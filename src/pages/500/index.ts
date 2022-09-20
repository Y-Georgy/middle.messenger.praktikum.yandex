const template = require("./template.hbs");
import Component from "../../modules/Core/Component";
import { TUnknownFuncVoid } from "../../types/types";
import styles from "./styles.module.scss";import { Router } from "../../modules/Router/Router";

type TProps = {
  events: Record<string, TUnknownFuncVoid>,
}


const page500 = () => {
  const router = new Router();
  class Page500 extends Component<TProps> {
    constructor(props: TProps) {
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

  const page = new Page500({
    events: {
      click: handleClick
    },
  });

  return page;
}

export default page500;

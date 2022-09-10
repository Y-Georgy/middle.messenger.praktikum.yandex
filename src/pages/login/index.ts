import template from "./template.hbs";
import Component from "../../modules/Core/Component";
import * as styles from "./styles.module.scss";
import { getProps } from "./props";
import { TUnknownFuncVoid } from "../../types/types";
import Title from "../../components/authTitle";
import Input from "../../components/authInput";
import { useValidator } from "../../modules/hooks/useValidator";
import { Router } from "../../modules/Router/Router";
import { TLoginValues, authApi } from "../../modules/Api/authApi";

type TProps = {
  events: Record<string, TUnknownFuncVoid>,
  title: Title,
  inputLogin: Input,
  inputPassword: Input
}

const loginPage = () => {
  const { errors, values, stateForm, onChangeValues } = useValidator();
  const router = new Router();
  class Page extends Component {
    constructor(props: TProps) {
      super(props, "form", {
        name: "login",
        class: styles.auth,
      });
    }

    render() {
      return template({ ...this.props, styles });
    }
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLElement;
    onChangeValues(form);

    if (!stateForm.isDisabled) {
      authApi.login(values as TLoginValues)
        .then((res: string) => {
          if (res === "OK") {
            router.go("/");
          }
        })
        .catch(err => console.log('err', err))
    }
    page.setProps(
      getProps(errors, values, stateForm.isDisabled)
    )
  }

  function handleBlurOrFocus( event: Event ) {
    const input = event.target as HTMLElement;
    onChangeValues(input);
    page.setProps(
      getProps(errors, values, stateForm.isDisabled)
    )
  }

  function handleClick(event: Event) {
    const target = event.target as HTMLElement
    if (target.id === 'link-register') {
      event.preventDefault();
      router.go("/register");
    }
  }

  const page = new Page({
    events: {
      submit: handleSubmit,
      blur: handleBlurOrFocus,
      focus: handleBlurOrFocus,
      click: handleClick
    },
    ...getProps(errors, values, stateForm.isDisabled)
  });

  return page;
}

export default loginPage;
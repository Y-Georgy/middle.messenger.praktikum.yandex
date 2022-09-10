import template from "./template.hbs";
import Component from "../../modules/Core/Component";
import { getProps } from "./props";
import buttonSubmit from "../../components/buttonSubmit";
import Title from "../../components/authTitle";
import Input from "../../components/authInput";
import { TUnknownFuncVoid } from "../../types/types";
import * as styles from "./styles.module.scss";
import { useValidator } from "../../modules/hooks/useValidator";
import { Router } from "../../modules/Router/Router";
import { TLoginValues, TRegisterValues, authApi } from "../../modules/Api/authApi";

type TProps = {
  events: Record<string, TUnknownFuncVoid>,
  title: Title,
  buttonSubmit: buttonSubmit,
  inputLogin: Input,
  inputEmail: Input,
  inputName: Input,
  inputSecondName: Input,
  inputPhone: Input,
  inputPassword: Input,
  inputPasswordCheck: Input,
}

const registerPage = () => {
  const { errors, values, stateForm, onChangeValues } = useValidator();
  const router = new Router();
  class Page extends Component {
    constructor(props: TProps) {
      super(props, "form", {
        name: "register",
        class: styles.register,
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
      authApi.register(values as TRegisterValues)
        .then(() => { // res: {id: number}
          const {login, password} = values
          return authApi.login({login, password} as TLoginValues)
            .then((res: string) => {
              if (res === "OK") {
                router.go("/");
              }
            })
          })
        .catch(err => console.log('err', err))
    }

    page.setProps(
      getProps(errors, values, stateForm.isDisabled)
    )
  }

  function handleBlurOrFocus(event: Event) {
    const input = event.target as HTMLElement;
    onChangeValues(input);

    page.setProps(
      getProps(errors, values, stateForm.isDisabled)
    )
  }

  function handleClick(event: Event) {
    const target = event.target as HTMLElement
    if (target.id === 'link-login') {
      event.preventDefault();
      router.go("/login");
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
    }
  );

  return page;
}

export default registerPage;

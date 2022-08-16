import template from "./template.hbs";
import Component from "../../utils/Component";
import { getProps } from "./props";
import buttonSubmit from "../../components/buttonSubmit";
import Title from "../../components/authTitle";
import Link from "../../components/link";
import Input from "../../components/authInput";
import { TUnknownFuncVoid } from "../../types/types";
import * as styles from "./styles.module.scss";
import { useValidator } from "../../hooks/useValidator";

type TProps = {
  events: Record<string, TUnknownFuncVoid>,
  title: Title,
  buttonSubmit: buttonSubmit,
  link: Link,
  inputLogin: Input,
  inputName: Input,
  inputSecondName: Input,
  inputPhone: Input,
  inputPassword: Input,
  inputPasswordCheck: Input,
}

const registerPage = () => {
  const { errors, values, stateForm, onChangeValues } = useValidator();
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
      console.log(values);
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

  const page = new Page({
      events: {
        submit: handleSubmit,
        blur: handleBlurOrFocus,
        focus: handleBlurOrFocus,
      },
      ...getProps(errors, values, stateForm.isDisabled)
    }
  );

  return page;
}

export default registerPage;

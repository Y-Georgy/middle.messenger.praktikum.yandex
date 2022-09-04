import ProfileLayout from "../../layouts/profile";
import template from "./template.hbs";
import Component from "../../modules/Core/Component";
import { changePasswordContentProps } from "./props";
import Input from "../../components/profileInput";
import ButtonSubmit from "../../components/buttonSubmit";
import Avatar from "../../components/avatar";
import { useValidator } from "../../modules/hooks/useValidator";
import * as styles from "./styles.module.scss";
import { Router } from "../../modules/Router/Router";

type TChangePasswordContentProps = {
  avatar: Avatar,
  buttonSubmit: ButtonSubmit,
  inputOldPassword: Input,
  inputNewPassword: Input,
  inputRepeatPassword: Input,
}

const changePasswordPage = () => {
  const { errors, values, stateForm, onChangeValues } = useValidator();
  const router = new Router();
  class ChangePasswordContent extends Component {
    constructor(props: TChangePasswordContentProps) {
      super(props, "section", {
        class: styles.profile,
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

    page.setProps({
      content: new ChangePasswordContent(
        changePasswordContentProps(errors, stateForm.isDisabled, values)
      ).render()
    })

    if (!stateForm.isDisabled) {
      console.log(values);
    }
  }

  function handleBlurOrFocus( event: Event ) {
    const input = event.target as HTMLElement;
    onChangeValues(input);

    page.setProps({
      content: new ChangePasswordContent(
        changePasswordContentProps(errors, stateForm.isDisabled, values)
      ).render()
    })
  }

  function handleClick(event: Event) {
    const target = event.target as HTMLElement
    if (target.id === 'btn-back') {
      router.back();
    }
  }

  const page = new ProfileLayout({
    events: {
      submit: handleSubmit,
      blur: handleBlurOrFocus,
      focus: handleBlurOrFocus,
      click: handleClick,
    },
    content: new ChangePasswordContent(
      changePasswordContentProps(errors, stateForm.isDisabled, values)
    ).render()
  });

  return page;
}

export default changePasswordPage;

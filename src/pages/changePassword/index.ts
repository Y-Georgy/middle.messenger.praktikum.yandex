import ProfileLayout from "../../layouts/profile";
import template from "./template.hbs";
import Component from "../../utils/Component";
import { changePasswordContentProps } from "./props";
import Input from "../../components/profileInput";
import ButtonSubmit from "../../components/buttonSubmit";
import Avatar from "../../components/avatar";
import { useValidator } from "../../hooks/useValidator";
import * as styles from "./styles.module.scss";

type TChangePasswordContentProps = {
  avatar: Avatar,
  buttonSubmit: ButtonSubmit,
  inputOldPassword: Input,
  inputNewPassword: Input,
  inputRepeatPassword: Input,
}

const changePasswordPage = () => {
  const { errors, values, stateForm, onChangeValues } = useValidator();
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

  const page = new ProfileLayout({
    events: {
      submit: handleSubmit,
      blur: handleBlurOrFocus,
      focus: handleBlurOrFocus,
    },
    content: new ChangePasswordContent(
      changePasswordContentProps(errors, stateForm.isDisabled, values)
    ).render()
  });

  return page;
}

export default changePasswordPage;

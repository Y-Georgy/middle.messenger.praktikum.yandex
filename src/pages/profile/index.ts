import ProfileLayout from "../../layouts/profile";
import template from "./template.hbs";
import Component from "../../modules/Core/Component";
import { getProps } from "./props";
import ButtonSubmit from "../../components/buttonSubmit";
import Avatar from "../../components/avatar";
import Input from "../../components/authInput";
import { useValidator } from "../../modules/hooks/useValidator";
import * as styles from "./styles.module.scss";
import { Router } from "../../modules/Router/Router";

export type TProfilePageProps = {
  isCanChangeData: boolean,
  buttonSubmit: ButtonSubmit,
  avatar: Avatar,
  inputEmail: Input,
  inputLogin: Input,
  inputName: Input
  inputSecondName: Input
  inputDisplayName: Input
  inputPhone: Input
}

const profilePage = () => {
  const { errors, values, init: initValidator, stateForm, onChangeValues } = useValidator();
  const router = new Router();

  const initValues = {
    email: 'username@mail.com',
    login: 'login',
    first_name: 'First-Name',
    second_name: 'Second-Name',
    display_name: 'Nick',
    phone: '+79991112233',
  }
  initValidator(initValues)

  let isCanChangeData = false;
  class Page extends Component {
    constructor(props: TProfilePageProps) {
      super(props);
    }

    render() {
      return template({ ...this.props, styles });
    }
  }

  function handleClick(event: Event) {
    const target = event.target as HTMLElement
    if (target.id === 'btn-back') {
      router.back();
    }
    if (target.id === 'linkChangeData') {
      event.preventDefault();
      isCanChangeData = true;
      page.setProps({
        content: new Page(getProps(errors, values, isCanChangeData, stateForm.isDisabled)).render()
      })
    }
    if (target.id === 'link-change-password') {
      event.preventDefault();
      router.go("/change-password");
    }
    if (target.id === 'link-login') {
      event.preventDefault();
      router.go("/login");
    }
  }

  function handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLElement;
    onChangeValues(form);

    if (!stateForm.isDisabled) {
      console.log(values);
      isCanChangeData = false
    }

    page.setProps({
      content: new Page(getProps(errors, values, isCanChangeData, stateForm.isDisabled)).render()
    })
  }

  function handleBlurOrFocus( event: Event ) {
    const input = event.target as HTMLElement;
    onChangeValues(input);

    page.setProps({
      content: new Page(getProps(errors, values, isCanChangeData, stateForm.isDisabled)).render()
    })
  }

  const page = new ProfileLayout({
    events: {
      submit: handleSubmit,
      blur: handleBlurOrFocus,
      focus: handleBlurOrFocus,
      click: handleClick,
    },
    content: new Page(getProps(errors, values, isCanChangeData, stateForm.isDisabled)).render()
  });

  return page;
}

export default profilePage;


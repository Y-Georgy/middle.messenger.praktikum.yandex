import Title from "../../components/authTitle";
import Input from "../../components/authInput";
import ButtonSubmit from "../../components/buttonSubmit";
import Link from "../../components/link";

export const getProps = (errors, values, isDisabledForm) => (
  {
    title: new Title({ title: "Регистрация" }).render(),
    buttonSubmit: new ButtonSubmit({
      text: "Зарегистрироваться",
      disabled: isDisabledForm
    }).render(),
    link: new Link({
      href: "login",
      text: "Войти",
    }).render(),
    inputLogin: new Input({
      name: "login",
      label: "Логин",
      value: values.login,
      errorText: errors.login,
      type: "text",
    }).render(),
    inputName: new Input({
      name: "first_name",
      label: "Имя",
      value: values.first_name,
      errorText: errors.first_name,
      type: "text",
    }).render(),
    inputSecondName: new Input({
      name: "second_name",
      label: "Фамилия",
      value: values.second_name,
      errorText: errors.second_name,
      type: "text",
    }).render(),
    inputPhone: new Input({
      name: "phone",
      label: "Телефон",
      value: values.phone,
      errorText: errors.phone,
      type: "tel",
    }).render(),
    inputPassword: new Input({
      name: "password",
      label: "Пароль",
      value: values.password,
      errorText: errors.password,
      type: "password",
    }).render(),
    inputPasswordCheck: new Input({
      name: "repeatPassword",
      label: "Пароль (еще раз)",
      value: values.repeatPassword,
      errorText: errors.repeatPassword,
      type: "password",
    }).render(),
  }
)
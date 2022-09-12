import Title from "../../components/authTitle";
import Input from "../../components/authInput";
import ButtonSubmit from "../../components/buttonSubmit";

type TData = {
  login?: string,
  email?: string,
  first_name?: string,
  second_name?: string,
  phone?: string,
  password?: string,
  repeatPassword?: string,
}

export const getProps = (errors: TData, values: TData, isDisabledForm: boolean) => (
  {
    title: new Title({ title: "Регистрация" }).render(),
    buttonSubmit: new ButtonSubmit({
      text: "Зарегистрироваться",
      disabled: isDisabledForm
    }).render(),
    inputLogin: new Input({
      name: "login",
      label: "Логин",
      value: values.login,
      errorText: errors.login,
      type: "text",
    }).render(),
    inputEmail: new Input({
      name: "email",
      label: "Эл.почта",
      value: values.email,
      errorText: errors.email,
      type: "email",
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
);

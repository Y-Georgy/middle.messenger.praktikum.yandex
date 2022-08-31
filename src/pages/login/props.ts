import Title from "../../components/authTitle";
import Link from "../../components/link";
import ButtonSubmit from "../../components/buttonSubmit";
import Input from "../../components/authInput";

type TData = {
  login?: string,
  password?: string,
}

export const getProps = (errors: TData, values: TData, isDisabledForm: boolean) => ({
  title: new Title({ title: "Вход" }).render(),
  buttonSubmit: new ButtonSubmit({
    text: "Вход",
    disabled: isDisabledForm
  }).render(),
  link: new Link({
    href: "register",
    text: "Зарегистрироваться",
  }).render(),
  inputLogin: new Input({
    name: "login",
    label: "Логин",
    value: values.login,
    errorText: errors.login,
    type: "text",
  }).render(),
  inputPassword: new Input({
    name: "password",
    label: "Пароль",
    value: values.password,
    errorText: errors.password,
    type: "password",
  }).render(),
});
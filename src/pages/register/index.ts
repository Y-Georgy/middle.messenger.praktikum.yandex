import template from "./template.hbs";
import Title from "../../components/authTitle";
import Input from "../../components/authInput";
import ButtonSubmit from "../../components/buttonSubmit";
import Link from "../../components/link";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";

class RegisterPage extends Component {
  constructor(props) {
    super(props, "form", {
      name: "register",
      class: styles.register,
    });
  }

  render() {
    return template({ ...this.props, styles });
  }
}

const loginPage = new RegisterPage({
  title: new Title({ title: "Регистрация" }).render(),
  buttonSubmit: new ButtonSubmit({
    text: "Зарегистрироваться",
  }).render(),
  link: new Link({
    href: "login",
    text: "Войти",
  }).render(),
  inputLogin: new Input({
    name: "login",
    label: "Логин",
    value: "ivanivanov",
    errorText: "",
    type: "text",
  }).render(),
  inputName: new Input({
    name: "first_name",
    label: "Имя",
    value: "Иван",
    errorText: "",
    type: "text",
  }).render(),
  inputSecondName: new Input({
    name: "second_name",
    label: "Фамилия",
    value: "Иванов",
    errorText: "",
    type: "text",
  }).render(),
  inputPhone: new Input({
    name: "phone",
    label: "Телефон",
    value: "+7 (909) 967 30 30",
    errorText: "",
    type: "tel",
  }).render(),
  inputPassword: new Input({
    name: "password",
    label: "Пароль",
    value: "12345678",
    errorText: "",
    type: "password",
  }).render(),
  inputPasswordCheck: new Input({
    name: "password-check",
    label: "Пароль (еще раз)",
    value: "12345678",
    errorText: "Пароли не совпадают",
    type: "password",
  }).render(),
});

export default loginPage;

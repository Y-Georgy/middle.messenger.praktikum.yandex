import template from "./template.hbs";
import Title from "../../components/authTitle";
import Input from "../../components/authInput";
import Link from "../../components/link";
import Component from "../../utils/Component";
import ButtonSubmit from "../../components/buttonSubmit";
import * as styles from "./styles.module.scss";

class LoginPage extends Component {
  constructor(props) {
    super("section", props);
  }

  render() {
    return template({ ...this.props, styles });
  }
}

const loginPage = new LoginPage({
  title: new Title({ title: "Вход" }).render(),
  buttonSubmit: new ButtonSubmit({
    text: "Вход"
  }).render(),
  link: new Link({
    href: "register",
    text: "Зарегистрироваться"
  }).render(),
  inputLogin: new Input({
    name: "login",
    label: "Логин",
    value: "Иванов",
    errorText: "Неверный логин",
    type: "text"
  }).render(),
  inputPassword: new Input({
    name: "password",
    label: "Пароль",
    value: "Иванов",
    errorText: "",
    type: "password"
  }).render(),
});

export default loginPage;

import template from "./template.hbs";
import Title from "../../components/authTitle";
import Input from "../../components/authInput";
import Link from "../../components/link";
import Component from "../../utils/Component";
import ButtonSubmit from "../../components/buttonSubmit";
import * as styles from "./styles.module.scss";

class LoginPage extends Component {
  props: any;
  setProps(nextProps: {}): void {
  }

  constructor(props) {
    super(props, "form", {
      name: "login",
      class: styles.auth,
    });
  }

  render() {
    return template({ ...this.props, styles });
  }
}

const loginPage = new LoginPage({
  title: new Title({ title: "Вход" }).render(),
  buttonSubmit: new ButtonSubmit({
    text: "Вход",
  }).render(),
  link: new Link({
    href: "register",
    text: "Зарегистрироваться",
  }).render(),
  inputLogin: new Input({
    name: "login",
    label: "Логин",
    value: "Иванов",
    errorText: "Неверный логин",
    type: "text",
  }).render(),
  inputPassword: new Input({
    name: "password",
    label: "Пароль",
    value: "Иванов",
    errorText: "",
    type: "password",
  }).render(),
});

export default loginPage;

// Обновление работает так
setTimeout(() => {
  loginPage.setProps({
    buttonSubmit: new ButtonSubmit({
      text: "Вход2",
    }).render(),
  });
}, 3000);

setTimeout(() => {
  loginPage.setProps({
    title: new Title({ title: "Вход2" }).render(),
  });
}, 5000);

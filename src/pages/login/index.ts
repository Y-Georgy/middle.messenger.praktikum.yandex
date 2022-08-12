import template from "./template.hbs";
import Title from "../../components/authTitle";
import Input from "../../components/authInput";
import Link from "../../components/link";
import Component from "../../utils/Component";
import ButtonSubmit from "../../components/buttonSubmit";
import * as styles from "./styles.module.scss";
import { isValidLogin, isValidPassword } from "../../utils/validation";

class LoginPage extends Component {
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

const handleSubmit = ( event ) => {
  event.preventDefault();
  const inputsNodeList = event.target.querySelectorAll('input');
  const inputs: HTMLInputElement[] = Array.from(inputsNodeList);
  const formValues: Record<string, string>  = {};
  inputs.forEach(input => {
    formValues[input.name] = input.value        
  })
  console.log(formValues); // data for api
}

const handleBlurOrFocus = ( event ) => {
  if (event.target.name === 'login') {
    const loginError = isValidLogin(event.target.value);    

    loginPage.setProps({
      inputLogin: new Input({
        name: "login",
        label: "Логин",
        value: event.target.value,
        errorText: loginError,
        type: "text",
      }).render(),
    })
  } else if (event.target.name === 'password') {
    const passwordError = isValidPassword(event.target.value);    

    loginPage.setProps({
      inputPassword: new Input({
        name: "password",
        label: "Пароль",
        value: event.target.value,
        errorText: passwordError,
        type: "password",
      }).render(),
    })
  }
}

const loginPage = new LoginPage({
  events: {
    submit: handleSubmit,
    blur: handleBlurOrFocus,
    focus: handleBlurOrFocus,
  },
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
    value: "Alex",
    errorText: "",
    type: "text",
  }).render(),
  inputPassword: new Input({
    name: "password",
    label: "Пароль",
    value: "A12345678",
    errorText: "",
    type: "password",
  }).render(),
});

export default loginPage;

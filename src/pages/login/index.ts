import template from "./template.hbs";
import Title from "../../components/authTitle";
import Input from "../../components/authInput";
import Link from "../../components/link";
import Component from "../../utils/Component";
import ButtonSubmit from "../../components/buttonSubmit";
import * as styles from "./styles.module.scss";
import { isValidLogin, isValidPassword } from "../../utils/validation";

let isDisableSubmitLogin;
let errorLoginInput;
let errorPasswordInput;

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

function handleSubmit( event ) {
  event.preventDefault();
  const inputsNodeList = event.target.querySelectorAll('input');
  const inputs: HTMLInputElement[] = Array.from(inputsNodeList);
  const formValues: Record<string, string>  = {};
  inputs.forEach(input => {
    formValues[input.name] = input.value        
  })
  
  handleErrorLogin(formValues.login)
  handleErrorPassword(formValues.password)

  if (isDisableSubmitLogin) console.log('Форма заблокирована, введены не корректные данные');
  else console.log(formValues); // data for api
}

function diableForm() {
  isDisableSubmitLogin = !!errorLoginInput || !!errorPasswordInput;
  loginPage.setProps({
    buttonSubmit: new ButtonSubmit({
      text: "Вход",
      disabled: isDisableSubmitLogin
    }).render(),
  })
}

function handleErrorLogin (value) {
  errorLoginInput = isValidLogin(value);    

  loginPage.setProps({
    inputLogin: new Input({
      name: "login",
      label: "Логин",
      value: value,
      errorText: errorLoginInput,
      type: "text",
    }).render(),
  })

  diableForm()
}

function handleErrorPassword(value) {
  errorPasswordInput = isValidPassword(value);    

    loginPage.setProps({
      inputPassword: new Input({
        name: "password",
        label: "Пароль",
        value: value,
        errorText: errorPasswordInput,
        type: "password",
      }).render(),
    })

    diableForm()
}

function handleBlurOrFocus( event ) {
  if (event.target.name === 'login') {
    handleErrorLogin(event.target.value)
  } else if (event.target.name === 'password') {
    handleErrorPassword(event.target.value)
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
    disabled: false
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

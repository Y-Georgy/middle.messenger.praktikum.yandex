import template from "./template.hbs";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";
import { getFormData, isDisableForm, isValidLogin, isValidPassword, setErrors } from "../../utils/validation";
import { getProps } from "./login";

const errors = {
  login: '',
  password: '',
}

const values = {
  login: '',
  password: '',
}

let isDisabledForm = false;

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

function handleSubmit(event) {  
  event.preventDefault();
  
  Object.entries(getFormData(event)).forEach((([key, value]) => {
    values[key] = value;
  }))

  setErrors(errors, values);
  isDisabledForm = isDisableForm(errors); 
  
  if (!isDisabledForm) {
    console.log(values);
  }
  
  loginPage.setProps(
    getProps(errors, values, isDisabledForm)
  )
}

function handleBlurOrFocus( event ) {
  const { name, value } = event.target;
  if (!name) {
    return;
  }
  values[name] = value;
  const obj = {};
  obj[name] = value
  setErrors(errors, obj);
  const isDisabledForm = isDisableForm(errors);

  loginPage.setProps(
    getProps(errors, values, isDisabledForm)
  )
}

const loginPage = new LoginPage({
  events: {
    submit: handleSubmit,
    blur: handleBlurOrFocus,
    focus: handleBlurOrFocus,
  },
  ...getProps(errors, values, isDisabledForm)
});

export default loginPage;

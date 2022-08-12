import template from "./template.hbs";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";
import { getProps } from "./register";
import { getFormData, isDisableForm, setErrors } from "../../utils/validation";

const errors = {
  login: '',
  first_name: '',
  second_name: '',
  phone: '',
  password: '',
  repeatPassword: '',
}

const values = {
  login: '',
  first_name: '',
  second_name: '',
  phone: '',
  password: '',
  repeatPassword: '',
}

let isDisabledForm = false;

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
  
  registerPage.setProps(
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

  registerPage.setProps(
    getProps(errors, values, isDisabledForm)
  )
}

const registerPage = new RegisterPage({
    events: {
      submit: handleSubmit,
      blur: handleBlurOrFocus,
      focus: handleBlurOrFocus,
    },
    ...getProps(errors, values, isDisabledForm)
  }
);

export default registerPage;

import ProfileLayout from "../../layouts/profile";

import template from "./template.hbs";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";
import { getFormData, isDisableForm, isValidPassword } from "../../utils/validation";
import { changePasswordContentProps } from "./changePassword";


const errors = {
  oldPassword: '',
  newPassword: '', 
  repeatPassword: '', 
}

const values = {
  oldPassword: '',
  newPassword: '', 
  repeatPassword: '', 
}

let isDisabledForm = false;

class ChangePassword extends Component {
  constructor(props) {
    super(props, "section", {
      class: styles.profile,
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

  Object.keys(values).forEach(key => {
    if (key === 'oldPassword') {
      errors[key] = isValidPassword(values[key])
    } else if (key === 'newPassword') {
      errors[key] = isValidPassword(values[key])
    } else if (key === 'repeatPassword') {
      errors[key] = isValidPassword(values[key])
    }
  });

  let isDisabledForm = isDisableForm(errors); 

  changePasswordPage.setProps({
    content: new ChangePassword(
      changePasswordContentProps(errors, isDisabledForm, values)
    ).render()
  })

  if (!isDisabledForm) console.log(values);
}

const changePasswordPage = new ProfileLayout({
  events: {
    submit: handleSubmit,
    // blur: handleChangeInput,
    // focus: handleChangeInput,
  },
  content: new ChangePassword(
    changePasswordContentProps(errors, isDisabledForm, values)
  ).render()
});

export default changePasswordPage;

import ProfileLayout from "../../layouts/profile";

import template from "./template.hbs";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";
import { getFormData, isDisableForm, setErrors } from "../../utils/validation";
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

class ChangePasswordContent extends Component {
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

  setErrors(errors, values);
  const isDisabledForm = isDisableForm(errors);

  changePasswordPage.setProps({
    content: new ChangePasswordContent(
      changePasswordContentProps(errors, isDisabledForm, values)
    ).render()
  })

  if (!isDisabledForm) console.log(values);
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
  isDisabledForm = isDisableForm(errors);

  changePasswordPage.setProps({
    content: new ChangePasswordContent(
      changePasswordContentProps(errors, isDisabledForm, values)
    ).render()
  })
}

const changePasswordPage = new ProfileLayout({
  events: {
    submit: handleSubmit,
    blur: handleBlurOrFocus,
    focus: handleBlurOrFocus,
  },
  content: new ChangePasswordContent(
    changePasswordContentProps(errors, isDisabledForm, values)
  ).render()
});

export default changePasswordPage;

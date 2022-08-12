import ProfileLayout from "../../layouts/profile";
import template from "./template.hbs";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";
import { getProps } from "./profile";
import { getFormData, isDisableForm, setErrors } from "../../utils/validation";

const errors = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  display_name: '',
  phone: '',
}

const values = {
  email: 'username@mail.com',
  login: 'login',
  first_name: 'First-Name',
  second_name: 'Second-Name',
  display_name: 'Nick',
  phone: '+79991112233',
}

let isDisabledForm = false;
let isCanChangeData = false;
class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return template({ ...this.props, styles });
  }
}

function handleChangeData(event) {
  if (event.target.id === 'linkChangeData') {
    isCanChangeData = true;
    profilePage.setProps({
      content: new ProfilePage(getProps(errors, values, isCanChangeData, isDisabledForm)).render()
    })
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
    isCanChangeData = false
  }
  
  profilePage.setProps({
    content: new ProfilePage(getProps(errors, values, isCanChangeData, isDisabledForm)).render()
  })
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

  profilePage.setProps({
    content: new ProfilePage(getProps(errors, values, isCanChangeData, isDisabledForm)).render()
  })
}

const profilePage = new ProfileLayout({
  events: {
    submit: handleSubmit,
    blur: handleBlurOrFocus,
    focus: handleBlurOrFocus,
    click: handleChangeData,
  },
  content: new ProfilePage(getProps(errors, values, isCanChangeData, isDisabledForm)).render()
});

export default profilePage;


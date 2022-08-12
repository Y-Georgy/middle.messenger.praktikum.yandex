import ProfileLayout from "../../layouts/profile";
import template from "./template.hbs";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";
import { getProps } from "./profile";

const errors = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  display_name: '',
  phone: '',
} 

const values = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  display_name: '',
  phone: '+79991112233',
}

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
      content: new ProfilePage(getProps(errors, values, isCanChangeData)).render()
    })
  }
}


const profilePage = new ProfileLayout({
  events: {
    // submit: handleSubmit,
    // blur: handleBlurOrFocus,
    // focus: handleBlurOrFocus,
    click: handleChangeData,
  },
  content: new ProfilePage(getProps(errors, values, isCanChangeData)).render()
});

export default profilePage;


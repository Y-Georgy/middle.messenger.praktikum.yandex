import ProfileLayout from "../../layouts/profile";
import Avatar from "../../components/avatar";
import template from "./template.hbs";
import Input from "../../components/profileInput";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";
// import Popup from "../../components/popup";
// import popupContent from "./popupContent.hbs";
// import * as popupStyles from "./popupStyles.module.scss";

// const styledPopupContent = popupContent({ styles: popupStyles });
// const isPopupOpen = ""; // type any for open popup

// const profilePage = profileLayout(
//   template({ styles, styledPopupContent, isPopupOpen })
// );

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return template({ ...this.props, styles });
  }
}

const profileContent = new ProfilePage({
  avatar: new Avatar({}).render(),
  inputEmail: new Input({
    name: "email",
    label: "Почта",
    value: "pochta@yandex.ru",
    type: "email",
    disabled: "disabled",
  }).render(),
  inputLogin: new Input({
    name: "login",
    label: "Логин",
    value: "kate",
    type: "text",
    disabled: "disabled",
  }).render(),
  inputName: new Input({
    name: "first_name",
    label: "Имя",
    value: "Екатерина",
    type: "text",
    disabled: "disabled",
  }).render(),
  inputSecondName: new Input({
    name: "second_name",
    label: "Фамилия",
    value: "Иванова",
    type: "text",
    disabled: "disabled",
  }).render(),
  inputDisplayName: new Input({
    name: "display_name",
    label: "Имя в чате",
    value: "Kate",
    type: "text",
    disabled: "disabled",
  }).render(),
  inputPhone: new Input({
    name: "phone",
    label: "Телефон",
    value: "+7(999)123-45-67",
    type: "tel",
    disabled: "disabled",
  }).render(),
});

const profilePage = new ProfileLayout({
  content: profileContent.render()
});

export default profilePage;


import ProfileLayout from "../../layouts/profile";
import Avatar from "../../components/avatar";
import Input from "../../components/profileInput";
import ButtonSubmit from "../../components/buttonSubmit";
import template from "./template.hbs";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";

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

const changePasswordContent = new ChangePassword({
  avatar: new Avatar({
    imageLink: "",
  }).render(),
  buttonSubmit: new ButtonSubmit({
    text: "Сохранить",
  }).render(),
  inputOldPassword: new Input({
    name: "oldPassword",
    label: "Старый пароль",
    value: "12345678",
    type: "password",
    disabled: "",
  }).render(),
  inputNewPassword: new Input({
    name: "newPassword",
    label: "Новый пароль",
    value: "87654321",
    type: "password",
    disabled: "",
  }).render(),
  inputRepeatPassword: new Input({
    name: "repeatPassword",
    label: "Повторите новый пароль",
    value: "87654321",
    type: "password",
    disabled: "",
  }).render(),
});

const changePasswordPage = new ProfileLayout({
  content: changePasswordContent.render()
});

export default changePasswordPage;

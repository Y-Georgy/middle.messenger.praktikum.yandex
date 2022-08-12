import Avatar from "../../components/avatar";
import Input from "../../components/profileInput";
import ButtonSubmit from "../../components/buttonSubmit";

export const changePasswordContentProps = (errors, isDisabledForm, values) => ({
    avatar: new Avatar({
      imageLink: "",
    }).render(),
    buttonSubmit: new ButtonSubmit({
      text: "Сохранить",
      disabled: isDisabledForm,
    }).render(),
    inputOldPassword: new Input({
      name: "oldPassword",
      label: "Старый пароль",
      value: values.oldPassword,
      type: "password",
      disabled: false,
    }).render(),
    inputNewPassword: new Input({
      name: "newPassword",
      label: "Новый пароль",
      value: values.newPassword,
      type: "password",
      disabled: false,
    }).render(),
    inputRepeatPassword: new Input({
      name: "repeatPassword",
      label: "Повторите новый пароль",
      value: values.repeatPassword,
      type: "password",
      disabled: false,
    }).render(),
    errorTextOldPassword: errors.oldPassword ? `'Поле "Старый пароль" ${errors.oldPassword}` : '',
    errorTextNewPassword: errors.newPassword ? `Поле "Новый пароль" ${errors.newPassword}` : '',
    errorTextRepeatPassword: errors.repeatPassword ? `Поле "Повторите новый пароль" ${errors.repeatPassword}` : ''
  })
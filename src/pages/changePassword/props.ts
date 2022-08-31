import Avatar from "../../components/avatar";
import Input from "../../components/profileInput";
import ButtonSubmit from "../../components/buttonSubmit";

type TData = {
  oldPassword?: string,
  newPassword?: string,
  repeatPassword?: string,
}

export const changePasswordContentProps = (errors: TData, isDisabledForm: boolean, values: TData) => ({
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
      error: errors.oldPassword
    }).render(),
    inputNewPassword: new Input({
      name: "newPassword",
      label: "Новый пароль",
      value: values.newPassword,
      type: "password",
      disabled: false,
      error: errors.newPassword
    }).render(),
    inputRepeatPassword: new Input({
      name: "repeatPassword",
      label: "Повторите новый пароль",
      value: values.repeatPassword,
      type: "password",
      disabled: false,
      error: errors.repeatPassword
    }).render(),
  })
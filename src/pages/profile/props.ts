import Input from "../../components/profileInput";
import Avatar from "../../components/avatar";
import ButtonSubmit from "../../components/buttonSubmit";
import { TProfilePageProps } from ".";
import PopupContent from "./popupContent";
import Popup from "../../components/popup";
import { IMAGE_PRE_URL } from "../../modules/constants";

type TData = {
  email?: string,
  login?: string,
  first_name?: string,
  second_name?: string,
  display_name?: string,
  phone?: string,
  avatar?: string,
}

export const getProps = (errors: TData, values: TData, isCanChangeData: boolean, isDisabledForm: boolean, isOpenChangeAvatarPopup: boolean): TProfilePageProps => ({
  isCanChangeData: isCanChangeData,
  buttonSubmit: new ButtonSubmit({
    text: "Сохранить",
    form: "profileForm",
    disabled: isDisabledForm
  }).render(),
  avatar: new Avatar({ imageLink: values.avatar ? `${IMAGE_PRE_URL}${values.avatar}` : ''}).render(),
  inputEmail: new Input({
    name: "email",
    label: "Почта",
    value: values.email,
    type: "email",
    disabled: !isCanChangeData,
    error: errors.email
  }).render(),
  inputLogin: new Input({
    name: "login",
    label: "Логин",
    value: values.login,
    type: "text",
    disabled: !isCanChangeData,
    error: errors.login
  }).render(),
  inputName: new Input({
    name: "first_name",
    label: "Имя",
    value: values.first_name,
    type: "text",
    disabled: !isCanChangeData,
    error: errors.first_name
  }).render(),
  inputSecondName: new Input({
    name: "second_name",
    label: "Фамилия",
    value: values.second_name,
    type: "text",
    disabled: !isCanChangeData,
    error: errors.second_name
  }).render(),
  inputDisplayName: new Input({
    name: "display_name",
    label: "Имя в чате",
    value: values.display_name,
    type: "text",
    disabled: !isCanChangeData,
    error: errors.display_name
  }).render(),
  inputPhone: new Input({
    name: "phone",
    label: "Телефон",
    value: values.phone,
    type: "tel",
    disabled: !isCanChangeData,
    error: errors.phone
  }).render(),
  popup: new Popup({
    isOpen: isOpenChangeAvatarPopup,
    content: new PopupContent({
      button: new ButtonSubmit({
        text: "Поменять",
        disabled: false
      }).render()
    }).render()
  }).render()
});

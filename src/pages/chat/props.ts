import { TCurrentRecipent, TRecipient } from ".";
import Popup from "../../components/popup";
import PopupContent from "./popupContent";
import ButtonSubmit from "../../components/buttonSubmit";
import Input from "../../components/authInput";

type TData = {
  message?: string | undefined
}

export const getProps = (
  errors: TData,
  isDisabledFormMessage: boolean,
  recipients: TRecipient[],
  currentRecipent: TCurrentRecipent,
  isOpenAddUserPopup: boolean,
  isOpenRemoveUserPopup: boolean,
  isOpenAddChatPopup: boolean
) => ({
  recipients: recipients,
  currentRecipent: currentRecipent,
  error: errors.message,
  isDisabledFormMessage: isDisabledFormMessage,
  popupAddUser: new Popup({
    isOpen: isOpenAddUserPopup,
    content: new PopupContent({
      title: "Добавить пользователя",
      formId: "addUserForm",
      input: new Input({
        name: "login",
        label: "Логин",
        value: "",
        errorText: '',
        type: "text",
      }).render(),
      button: new ButtonSubmit({
        text: "Добавить",
        disabled: false
      }).render()
    }).render()
  }).render(),
  popupRemoveUser: new Popup({
    isOpen: isOpenRemoveUserPopup,
    content: new PopupContent({
      title: "Удалить пользователя",
      formId: "removeUserForm",
      input: new Input({
        name: "login",
        label: "Логин",
        value: "",
        errorText: '',
        type: "text",
      }).render(),
      button: new ButtonSubmit({
        text: "Удалить",
        disabled: false
      }).render()
    }).render()
  }).render(),
  popupAddChat: new Popup({
    isOpen: isOpenAddChatPopup,
    content: new PopupContent({
      title: "Создать чат",
      formId: "addChatForm",
      input: new Input({
        name: "title",
        label: "Название чата",
        value: "",
        errorText: '',
        type: "text",
      }).render(),
      button: new ButtonSubmit({
        text: "Создать",
        disabled: false
      }).render()
    }).render()
  }).render()
})
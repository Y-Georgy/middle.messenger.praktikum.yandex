import ProfileLayout from "../../layouts/profile";
import template from "./template.hbs";
import Component from "../../modules/Core/Component";
import { getProps } from "./props";
import ButtonSubmit from "../../components/buttonSubmit";
import Avatar from "../../components/avatar";
import Input from "../../components/authInput";
import { useValidator } from "../../modules/hooks/useValidator";
import * as styles from "./styles.module.scss";
import { Router } from "../../modules/Router/Router";
import store, { StoreEvents } from '../../modules/store/store';
import { authApi } from "../../modules/Api/authApi";
import { TUser } from "../../types/types";
import { userApi, TUserValues } from "../../modules/Api/UserApi";
import Popup from "../../components/popup";

export type TProfilePageProps = {
  isCanChangeData: boolean,
  buttonSubmit: ButtonSubmit,
  avatar: Avatar,
  inputEmail: Input,
  inputLogin: Input,
  inputName: Input
  inputSecondName: Input
  inputDisplayName: Input
  inputPhone: Input
  popup: Popup
}

const profilePage = () => {
  const { errors, values, init: initValidator, stateForm, onChangeValues } = useValidator();
  const router = new Router();

  let isCanChangeData = false;
  let isOpenChangeAvatarPopup = false;
  class Page extends Component {
    constructor(props: TProfilePageProps) {
      super(props);
    }

    render() {
      return template({ ...this.props, styles });
    }
  }

  store.on(StoreEvents.Updated, handleStoreUpdate);

  function handleStoreUpdate() {
    const initValues = store.getState().user;
    initValidator(initValues)
    updateProps();
  }

  authApi.getUser()
    .then((res: TUser) => {
      store.set('user', res)
    })
    .catch(err => console.log('errGetUser', err))

  function handleClick(event: Event) {
    const target = event.target as HTMLElement
    if (target.id === 'btn-back') {
      router.back();
    } else if (target.id === 'linkChangeData') {
      event.preventDefault();
      isCanChangeData = true;
      updateProps();
    } else if (target.id === 'link-change-password') {
      event.preventDefault();
      router.go("/change-password");
    } else if(target.id === 'link-logout') {
      event.preventDefault();
      authApi.logout()
        .then((res: string) => {
          if (res === "OK") {
            router.go("/login");
          }
        })
        .catch(console.log)
    } else if (target.id === 'changeAvatar') {
      isOpenChangeAvatarPopup = true;
      updateProps();

    } else if (target.id === 'popupOverlay') {
      isOpenChangeAvatarPopup = false;
      updateProps();
    }
  }

  function handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    if (form.id === "avatarForm") {
      const avatarInput: HTMLInputElement | null  = form.querySelector('#avatar');
      if (avatarInput !== null && avatarInput.files?.length) {
        userApi.changeAvatar(form)
          .then(newProfileData => {
            store.set('user', newProfileData)
            isOpenChangeAvatarPopup = false;
            updateProps();
          })
          .catch(console.log)
      }
    } else if (form.id === "profileForm") {
      onChangeValues(form);

      if (!stateForm.isDisabled) {
        userApi.changeUserProfile(values as TUserValues)
          .then(newProfileData => {
            store.set('user', newProfileData)
            isCanChangeData = false;
            updateProps();
          })
          .catch(console.log)
      }
    }
  }

  function handleBlurOrFocus( event: Event ) {
    const input = event.target as HTMLElement;
    onChangeValues(input);
    updateProps();
  }

  function updateProps() {
    page.setProps({
      content: new Page(getProps(errors, values, isCanChangeData, stateForm.isDisabled, isOpenChangeAvatarPopup)).render()
    })
  }

  const page = new ProfileLayout({
    events: {
      submit: handleSubmit,
      blur: handleBlurOrFocus,
      focus: handleBlurOrFocus,
      click: handleClick,
    },
    content: new Page(getProps(errors, values, isCanChangeData, stateForm.isDisabled, isOpenChangeAvatarPopup)).render()
  });

  return page;
}

export default profilePage;

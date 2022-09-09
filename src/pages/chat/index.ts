import template from "./template.hbs";
import Component from "../../modules/Core/Component";
import { getProps } from "./props";
import { TUnknownFuncVoid } from "../../types/types";
import { useValidator } from "../../modules/hooks/useValidator";
import * as styles from "./styles.module.scss";
import { Router } from "../../modules/Router/Router";
import { chatsApi } from "../../modules/Api/ChatsApi";

type TMessage = {
  text: string,
  isMy: boolean,
  time: string,
  date: string,
  day: string,
  styles: Record<string, string>
}

export type TCurrentRecipent = {
  name: string,
  avatarLink: string,
  messages: TMessage[]
}

export type TChat = {
  id: number,
  title: string,
  avatar: string | null,
  created_by: number,
  unread_count: number,
  last_message: null,
  styles: Record<string, string>
}

type TChatProps = {
  events: Record<string, TUnknownFuncVoid>,
  chats: TChat[],
  currentRecipent: TCurrentRecipent,
  error: string | undefined,
  isDisabledFormMessage: boolean
}

const chatPage = () => {
  const { errors, values, stateForm, init: validatorInit, onChangeValues } = useValidator();
  const router = new Router();

  let isOpenAddUserPopup = false;
  let isOpenRemoveUserPopup = false;
  let isOpenAddChatPopup = false;
  let chats: TChat[] = [];

  function updateChats() {
    chatsApi.getChats()
    .then(chatsData => {
      const chatsArr = chatsData.map((el: any): TChat => {
        el.styles = styles
        return el;
      });
      chats = chatsArr;
      page.setProps(
        getProps(
          errors,
          stateForm.isDisabled,
          chats,
          currentRecipent,
          isOpenAddUserPopup,
          isOpenRemoveUserPopup,
          isOpenAddChatPopup
        )
      )
    })
    .catch(console.log)
  }

  updateChats();

  let currentRecipent: TCurrentRecipent = {
    name: "Андрей",
    avatarLink:
      "https://sun1-97.userapi.com/s/v1/if1/Y_wWjvbJ8Erwfj0N_VQ0VhiJ5KQO1UJTwVaUcY72SkXJEAUAk4IHSFGKjjl-1OtVlPMShw.jpg?size=200x200&quality=96&crop=1,1,1339,1339&ava=1",
    messages: [
      {
        text: "Текст сообщения",
        isMy: false,
        time: "10:21",
        date: "19 июля",
        day: '',
        styles
      },
      {
        text: "Текст очень и очень длинного сообщения. Текст очень и очень длинного сообщения.",
        isMy: false,
        time: "10:22",
        date: "20 июля",
        day: '',
        styles
      },
      {
        text: "Текст очень и очень длинного сообщения.",
        isMy: true,
        time: "10:23",
        date: "20 июля",
        day: '',
        styles
      },
      {
        text: "Текст очень и очень длинного сообщения. Текст очень и очень длинного сообщения. Текст очень и очень длинного сообщения.",
        isMy: false,
        time: "10:24",
        date: "20 июля",
        day: '',
        styles
      },
    ],
  };
  currentRecipent = {
    ...currentRecipent,
    messages: currentRecipent.messages.map((item, i, arr) => {
      if (i === 0) {
        item.day = item.date;
        return item;
      }
      if (item.date !== arr[i - 1].date) {
        item.day = item.date;
        return item;
      } else {
        return item;
      }
    }),
  };

  class ChatPage extends Component {
    constructor(props: TChatProps) {
      super(props, "section", {
        class: styles.section
      });
    }

    render() {
      return template({ ...this.props, styles });
    }
  }

  function handleClick(event: Event) {
    const target = event.target as HTMLElement
    if (target.id === 'link-profile') {
      event.preventDefault();
      router.go("/profile");
    } else if (target.id === 'addChat') {
      isOpenAddChatPopup = true;
      page.setProps(
        getProps(
          errors,
          stateForm.isDisabled,
          chats,
          currentRecipent,
          isOpenAddUserPopup,
          isOpenRemoveUserPopup,
          isOpenAddChatPopup
        )
      )
    } else if (target.id === 'popupOverlay') {
      isOpenAddUserPopup = false;
      isOpenRemoveUserPopup = false;
      isOpenAddChatPopup = false;

      page.setProps(
        getProps(
          errors,
          stateForm.isDisabled,
          chats,
          currentRecipent,
          isOpenAddUserPopup,
          isOpenRemoveUserPopup,
          isOpenAddChatPopup
        )
      )
    }
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLElement;

    if (form.id === "addChatForm") {
      const input = form.querySelector('input');
      if (input && input.value) {
        chatsApi.createChat(input.value)
          .then(() => {
            isOpenAddChatPopup = false;
            updateChats();
          })
          .catch(console.log)
      }

    } else if (form.id === "newMessage"){
      onChangeValues(form);

      if (!stateForm.isDisabled) {
        console.log(values);
        // Здесь пушим новое сообщение в чат
      } else {
        setTimeout(() => {
          // TODO
          validatorInit({
            message: ' '
          })
          page.setProps(
            getProps(
              errors,
              stateForm.isDisabled,
              chats,
              currentRecipent,
              isOpenAddUserPopup,
              isOpenRemoveUserPopup,
              isOpenAddChatPopup
            )
          )
        }, 2000)
      }
      page.setProps(
        getProps(
          errors,
          stateForm.isDisabled,
          chats,
          currentRecipent,
          isOpenAddUserPopup,
          isOpenRemoveUserPopup,
          isOpenAddChatPopup
        )
      )
    }
  }

  const page = new ChatPage({
    events: {
      submit: handleSubmit,
      click: handleClick
    },
    ...getProps(
      errors,
      stateForm.isDisabled,
      chats,
      currentRecipent,
      isOpenAddUserPopup,
      isOpenRemoveUserPopup,
      isOpenAddChatPopup
    )
  });
  return page;
}

export default chatPage;


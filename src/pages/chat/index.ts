import template from "./template.hbs";
import Component from "../../modules/Core/Component";
import { getProps } from "./props";
import { TUnknownFuncVoid } from "../../types/types";
import { useValidator } from "../../modules/hooks/useValidator";
import * as styles from "./styles.module.scss";
import { Router } from "../../modules/Router/Router";
import { chatsApi } from "../../modules/Api/ChatsApi";
import store from "../../modules/store/store";
import { userApi } from "../../modules/Api/UserApi";
import { letsSocket } from "../../modules/Api/websocket";

export type TCurrentChat = {
  id: number,
  name: string,
  avatarLink: string | null,
  messages: TMessage[]
}

export type TChat = {
  id: number,
  title: string,
  avatar: string | null,
  created_by: number,
  unread_count: number,
  last_message: null,
  styles: Record<string, string>,
  selected?: boolean
}

export interface TMessageApi {
  id: number,
  user_id: number,
  chat_id: number,
  type: "message",
  time: string,
  content: string,
  is_read: boolean,
  file: null,
}

export interface TMessage extends TMessageApi {
  day?: string,
  date?: string,
  isMy: boolean,
  styles: Record<string, string>
}

type TChatProps = {
  events: Record<string, TUnknownFuncVoid>,
  chats: TChat[],
  currentChat: TCurrentChat,
  error: string | undefined,
  isDisabledFormMessage: boolean
}

type TSend = (message: string) => void

const chatPage = () => {
  const { errors, values, stateForm, init: validatorInit, onChangeValues } = useValidator();
  const router = new Router();

  let isOpenAddUserPopup = false;
  let isOpenRemoveUserPopup = false;
  let isOpenAddChatPopup = false;
  let isOpenChatUsersPopup = false;
  let chats: TChat[] = [];
  let send: null | TSend = null;

  function onMessage(messages: TMessageApi[]) {
    if (Array.isArray(messages)) {
      currentChat = {
        ...currentChat,
        messages: convertMessages(messages.reverse())
      }
      updateProps();
    } else if (typeof messages === 'object') {
      const arr = [...currentChat.messages, messages];
      currentChat = {
        ...currentChat,
        messages: convertMessages(arr)
      }
      updateProps();
    }
  }

  function updateChats() {
    chatsApi.getChats()
      .then(chatsData => {
        const chatsArr = chatsData.map((el: any): TChat => {
          el.styles = styles
          return el;
        });

        chats = chatsArr;
        beginChat(chatsArr[0].id);
        updateProps();
      })
      .catch(console.log)
  }

  updateChats();

  function beginChat(chatId: number) {
    chats = chats.map(item => {
      item.selected = item.id === chatId;
      if (item.selected) {
        currentChat = {
          ...currentChat,
          name: item.title,
          avatarLink: item.avatar,
          id: chatId
        }
      }
      return item;
    })

    chatsApi.getChatToken(chatId)
      .then(data => {
        const userId = store.getState().user.id;
        const token = data.token;
        const socket = letsSocket(userId, chatId, token, onMessage);
        send = socket.send;
      })
      .catch(console.log)
  }

  let currentChat: TCurrentChat = {
    id: 0,
    name: "",
    avatarLink: null,
    messages: []
  };

  function convertMessages(messages: TMessageApi[]): TMessage[] {
    console.log('convertMessages', messages);

    const currentUserId = store.getState().user.id;
    const arr = messages.map((item: TMessage) => {
      if (item.time.includes("T") && item.time.includes("+")) {
        item.date = item.time.split("T")[0].replace(/-/gi,".");
        item.time = item.time.split("T")[1].split("+")[0];
      }
      item.styles = styles;
      item.isMy = item.user_id === currentUserId;
      return item;
    })

    return arr.map((item: TMessage, i: number, arr: TMessage[]) => {
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
    })
  }

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

  function handleClick(event: any) {
    const chatElem = event.path ? event.path.find((el: HTMLElement) => el.id ? el.id.includes('selectChat') : false) : false;
    if (chatElem) {
      const chatId = chatElem.id.split('_')[1];
      beginChat(Number(chatId));
    }
    const target = event.target as HTMLElement
    if (target.id === 'link-profile') {
      event.preventDefault();
      router.go("/profile");
    } else if (target.id === 'addChat') {
      isOpenAddChatPopup = true;
      updateProps();
    } else if (target.id === 'popupOverlay') {
      isOpenAddUserPopup = false;
      isOpenRemoveUserPopup = false;
      isOpenAddChatPopup = false;
      updateProps();
    } else if (target.id === 'buttonOpenPopup') {
      isOpenChatUsersPopup = !isOpenChatUsersPopup;
      updateProps();
    } else if (target.id === 'addUser') {
      isOpenAddUserPopup = true;
      isOpenChatUsersPopup = false;
      updateProps();
    } else if (target.id === 'removeUser') {
      isOpenRemoveUserPopup = true;
      isOpenChatUsersPopup = false;
      updateProps();
    }
  }

  function handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLElement;
    if (form.id === "addUserForm") {
      const input = form.querySelector('input');
      if (input && input.value) {
        const login = input.value;
        userApi.searchUsersByLogin(login)
          .then(users => {
            const user = users.find((user: { login: string }) => user.login === login);
            if (user && currentChat.id) {
              chatsApi.addUserToChat(user.id, currentChat.id)
                .then(res => {
                  if (res === 'OK') {
                    isOpenAddUserPopup = false;
                    updateProps();
                  }
                })
                .catch(console.log)
            }
          })
          .catch(console.log)
      }
    } else if (form.id === "removeUserForm") {
      const input = form.querySelector('input');
      if (input && input.value) {
        const login = input.value;
          userApi.searchUsersByLogin(login)
            .then(users => {
              const user = users.find((user: { login: string }) => user.login === login);
              if (user && currentChat.id) {
                chatsApi.deleteUserFromChat(user.id, currentChat.id)
                  .then(res => {
                    if (res === 'OK') {
                      isOpenRemoveUserPopup = false;
                      updateProps();
                    }
                  })
                  .catch(console.log)
              }
            })
            .catch(console.log)
      }
    } else if (form.id === "addChatForm") {
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
        if (send && values.message) {
          send(values.message)
        }
      } else {
        setTimeout(() => {
          // TODO
          validatorInit({
            message: ' '
          })
          updateProps()
        }, 2000)
      }
      updateProps()
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
      currentChat,
      isOpenAddUserPopup,
      isOpenRemoveUserPopup,
      isOpenAddChatPopup,
      isOpenChatUsersPopup
    )
  });

  function updateProps() {
    page.setProps(
      getProps(
        errors,
        stateForm.isDisabled,
        chats,
        currentChat,
        isOpenAddUserPopup,
        isOpenRemoveUserPopup,
        isOpenAddChatPopup,
        isOpenChatUsersPopup
      )
    )
  }
  return page;
}

export default chatPage;


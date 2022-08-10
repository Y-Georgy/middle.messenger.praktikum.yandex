import template from "./template.hbs";
import Recipient from "../../components/recipient";
import Message from "../../components/message";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";

const recipients = [
  {
    name: "Андрей",
    avatarLink:
      "https://sun1-97.userapi.com/s/v1/if1/Y_wWjvbJ8Erwfj0N_VQ0VhiJ5KQO1UJTwVaUcY72SkXJEAUAk4IHSFGKjjl-1OtVlPMShw.jpg?size=200x200&quality=96&crop=1,1,1339,1339&ava=1",
    lastMessage: { text: "Текст сообщения", isMy: false, time: "10:21" },
    unreadCount: 2,
  },
  {
    name: "Андрей 2",
    avatarLink: "",
    lastMessage: {
      text: "Текст очень и очень длинного сообщения. Текст очень и очень длинного сообщения",
      isMy: true,
      time: "10:22",
    },
    unreadCount: 2,
  },
  {
    name: "Андрей",
    avatarLink:
      "https://sun1-97.userapi.com/s/v1/if1/Y_wWjvbJ8Erwfj0N_VQ0VhiJ5KQO1UJTwVaUcY72SkXJEAUAk4IHSFGKjjl-1OtVlPMShw.jpg?size=200x200&quality=96&crop=1,1,1339,1339&ava=1",
    lastMessage: { text: "Текст сообщения", isMy: false, time: "10:21" },
    unreadCount: 0,
  },
];
let currentRecipent = {
  name: "Андрей",
  avatarLink:
    "https://sun1-97.userapi.com/s/v1/if1/Y_wWjvbJ8Erwfj0N_VQ0VhiJ5KQO1UJTwVaUcY72SkXJEAUAk4IHSFGKjjl-1OtVlPMShw.jpg?size=200x200&quality=96&crop=1,1,1339,1339&ava=1",
  messages: [
    { text: "Текст сообщения", isMy: false, time: "10:21", date: "19 июля" },
    {
      text: "Текст очень и очень длинного сообщения. Текст очень и очень длинного сообщения.",
      isMy: false,
      time: "10:22",
      date: "20 июля",
    },
    {
      text: "Текст очень и очень длинного сообщения.",
      isMy: true,
      time: "10:23",
      date: "20 июля",
    },
    {
      text: "Текст очень и очень длинного сообщения. Текст очень и очень длинного сообщения. Текст очень и очень длинного сообщения.",
      isMy: false,
      time: "10:24",
      date: "20 июля",
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

// const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('messageText:', e.target.message.value);
// };

// window.onload = function() {
//     const newMessageForm = document.forms.newMessage;
//     if (newMessageForm) {
//         newMessageForm.addEventListener('submit', handleSubmit);
//     }
// };

// export default template({ styles, recipients, currentRecipent });

class ChatPage extends Component {
  constructor(props) {
    super(props, "section", {
        class: styles.section
    });
  }

  render() {
    return template({ ...this.props, styles });
  }
}

const chatPage = new ChatPage({
    recipient: new Recipient({
        recipient: recipients[0]
    }).render(),
    ///////////////////////////////
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
  // popup: popup.render() // отобразить попап
});

export default chatPage;

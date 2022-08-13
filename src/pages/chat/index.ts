import template from "./template.hbs";
import Component from "../../utils/Component";
import * as styles from "./styles.module.scss";
import { setErrors } from "../../utils/validation";
import { getProps } from "./chat";

const errors = {
  message: ''
}
const values = {
  message: ''
}

let isDisabledFormMessage = false;

let recipients = [
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

recipients = recipients.map(item => {
  item['styles'] = styles;
  return item;
})

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
      day: ''
    },
    {
      text: "Текст очень и очень длинного сообщения.",
      isMy: true,
      time: "10:23",
      date: "20 июля",
      day: ''
    },
    {
      text: "Текст очень и очень длинного сообщения. Текст очень и очень длинного сообщения. Текст очень и очень длинного сообщения.",
      isMy: false,
      time: "10:24",
      date: "20 июля",
      day: ''
    },
  ],
};
currentRecipent = {
  ...currentRecipent,
  messages: currentRecipent.messages.map((item, i, arr) => {
    item['styles'] = styles;
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

function handleSubmit(event) {
  event.preventDefault();

  const { name, value } = event.target.querySelector('#message');
  if (!name) {
    return;
  }
  values[name] = value;
  const obj = {};
  obj[name] = value
  setErrors(errors, obj);
  if (!errors.message) {
    isDisabledFormMessage = false;
    console.log(values);

    // Здесь пушим новое сообщение в чат
  } else {
    isDisabledFormMessage = true;
    setTimeout(() => {
      errors.message = '';
      isDisabledFormMessage = false;
      chatPage.setProps(
        getProps(errors, isDisabledFormMessage, recipients, currentRecipent)
      )
    }, 2000)
  }
  chatPage.setProps(
    getProps(errors, isDisabledFormMessage, recipients, currentRecipent)
  )
}

const chatPage = new ChatPage({
  events: {
    submit: handleSubmit,
  },
  ...getProps(errors, isDisabledFormMessage, recipients, currentRecipent)
});

export default chatPage;


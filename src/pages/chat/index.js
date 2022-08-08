import Handlebars from "handlebars";
import template from "./template.hbs";
import recipient from "../../components/recipient";
import message from "../../components/message";
import * as styles from "./styles.module.scss";

Handlebars.registerPartial("recipient", recipient);
Handlebars.registerPartial("message", message);

const recipients = [
    { name: "Андрей", avatarLink: 'https://sun1-97.userapi.com/s/v1/if1/Y_wWjvbJ8Erwfj0N_VQ0VhiJ5KQO1UJTwVaUcY72SkXJEAUAk4IHSFGKjjl-1OtVlPMShw.jpg?size=200x200&quality=96&crop=1,1,1339,1339&ava=1', lastMessage: { text: 'Текст сообщения', isMy: false, time: '10:21' }, unreadCount: 2 },
    { name: "Андрей 2", avatarLink: '', lastMessage: { text: 'Текст очень и очень длинного сообщения. Текст очень и очень длинного сообщения', isMy: true, time: '10:22' }, unreadCount: 2 },
    { name: "Андрей", avatarLink: 'https://sun1-97.userapi.com/s/v1/if1/Y_wWjvbJ8Erwfj0N_VQ0VhiJ5KQO1UJTwVaUcY72SkXJEAUAk4IHSFGKjjl-1OtVlPMShw.jpg?size=200x200&quality=96&crop=1,1,1339,1339&ava=1', lastMessage: { text: 'Текст сообщения', isMy: false, time: '10:21' }, unreadCount: 0 }
];
let currentRecipent = { 
    name: "Андрей", 
    avatarLink: 'https://sun1-97.userapi.com/s/v1/if1/Y_wWjvbJ8Erwfj0N_VQ0VhiJ5KQO1UJTwVaUcY72SkXJEAUAk4IHSFGKjjl-1OtVlPMShw.jpg?size=200x200&quality=96&crop=1,1,1339,1339&ava=1', 
    messages: [
        { text: 'Текст сообщения', isMy: false, time: '10:21', date: '19 июля' },
        { text: 'Текст очень и очень длинного сообщения. Текст очень и очень длинного сообщения.', isMy: false, time: '10:22', date: '20 июля' },
        { text: 'Текст очень и очень длинного сообщения.', isMy: true, time: '10:23', date: '20 июля' },
        { text: 'Текст очень и очень длинного сообщения. Текст очень и очень длинного сообщения. Текст очень и очень длинного сообщения.', isMy: false, time: '10:24', date: '20 июля' },
    ]
};
currentRecipent = {...currentRecipent, messages: currentRecipent.messages.map((item, i, arr) => {
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
})};

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

export default template({ styles, recipients, currentRecipent });

import Handlebars from "handlebars";
import template from "./template.hbs";
import recipient from "../../components/recipient";
import * as styles from "./styles.module.scss";

Handlebars.registerPartial("recipient", recipient);
const recipients = [
    { name: "Андрей", avatarLink: 'https://sun1-97.userapi.com/s/v1/if1/Y_wWjvbJ8Erwfj0N_VQ0VhiJ5KQO1UJTwVaUcY72SkXJEAUAk4IHSFGKjjl-1OtVlPMShw.jpg?size=200x200&quality=96&crop=1,1,1339,1339&ava=1', lastMessage: { text: 'Текст сообщения', isMy: false, time: '10:21' }, unreadCount: 2 },
    { name: "Андрей 2", avatarLink: '', lastMessage: { text: 'Текст очень и очень длинного сообщения. Текст очень и очень длинного сообщения', isMy: true, time: '10:22' }, unreadCount: 2 },
    { name: "Андрей", avatarLink: 'https://sun1-97.userapi.com/s/v1/if1/Y_wWjvbJ8Erwfj0N_VQ0VhiJ5KQO1UJTwVaUcY72SkXJEAUAk4IHSFGKjjl-1OtVlPMShw.jpg?size=200x200&quality=96&crop=1,1,1339,1339&ava=1', lastMessage: { text: 'Текст сообщения', isMy: false, time: '10:21' }, unreadCount: 2 }
];
export default template({ styles, recipients });

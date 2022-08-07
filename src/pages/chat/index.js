import Handlebars from "handlebars";
import template from "./template.hbs";
import recipient from "../../components/recipient";
import * as styles from "./styles.module.scss";

Handlebars.registerPartial("recipient", recipient);
// { name: "Андрей", avatarLink: '', lastMessage: { text: '', isMy: false, time: '10:21' }, unreadCount: 2 }
export default template({ styles });

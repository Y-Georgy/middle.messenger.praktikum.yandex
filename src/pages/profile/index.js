import Handlebars from 'handlebars';
import profileLayout from "../../layouts/profile";
import avatar from "../../components/avatar";
import template from "./template.hbs";
import input from '../../components/profileInput';
import popup from "../../components/popup"
import popupContent from "./popupContent.hbs"
import styles from "./styles.module.scss";
import popupStyles from "./popupStyles.module.scss";


Handlebars.registerPartial('avatar', avatar);
Handlebars.registerPartial('input', input);
Handlebars.registerPartial('popup', popup);

const styledPopupContent = popupContent({ styles: popupStyles});
const isPopupOpen = ""; // type any for open popup

const profilePage = profileLayout(template({styles, styledPopupContent, isPopupOpen}));

export default profilePage;
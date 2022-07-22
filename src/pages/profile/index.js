import Handlebars from 'handlebars';
import profileLayout from "../../layouts/profile";
import avatar from "../../components/avatar";
import template from "./template.hbs";
import input from '../../components/profileInput';
import styles from "./styles.module.scss";

Handlebars.registerPartial('avatar', avatar);
Handlebars.registerPartial('input', input);

const profilePage = profileLayout(template({styles}));
// const profilePage = profileLayout(profile);

export default profilePage;
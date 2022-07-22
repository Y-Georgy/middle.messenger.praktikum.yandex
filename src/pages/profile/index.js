import Handlebars from 'handlebars';
import profileLayout from "../../layouts/profile";
import avatar from "../../components/avatar";
import profile from "./profile.hbs"
import input from '../../components/profileInput';
import styles from "./profile.module.scss"

Handlebars.registerPartial('avatar', avatar);
Handlebars.registerPartial('input', input);

const profilePage = profileLayout(profile({styles}));
// const profilePage = profileLayout(profile);

export default profilePage;
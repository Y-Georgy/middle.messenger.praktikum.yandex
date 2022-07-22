import Handlebars from 'handlebars';
import profileLayout from "../../layouts/profile";
import avatar from "../../components/avatar";
import profile from "./profile.hbs"
import styles from "./profile.module.scss"

Handlebars.registerPartial('avatar', avatar);

const profilePage = profileLayout(profile({styles}));
// const profilePage = profileLayout(profile);

export default profilePage;
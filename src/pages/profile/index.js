import Handlebars from 'handlebars';
import profileLayout from "../../layouts/profile";
import avatar from "../../components/avatar";
import profile from "./profile.hbs"

Handlebars.registerPartial('avatar', avatar);

const profilePage = profileLayout(profile);
// const profilePage = profileLayout(profile);

export default profilePage;
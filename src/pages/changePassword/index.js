import Handlebars from 'handlebars';
import profileLayout from "../../layouts/profile";
import avatar from "../../components/avatar";
import input from '../../components/profileInput';
import buttonSubmit from '../../components/buttonSubmit';
import template from "./template.hbs";
import styles from "./styles.module.scss";

Handlebars.registerPartial('avatar', avatar);
Handlebars.registerPartial('input', input);
Handlebars.registerPartial('buttonSubmit', buttonSubmit);

export default profileLayout(template({styles}));;
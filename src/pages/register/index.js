import Handlebars from 'handlebars';
import register from "./register.hbs";
import title from '../../components/authTitle';
import input from '../../components/authInput';
import buttonSubmit from '../../components/buttonSubmit';
import link from '../../components/link';
import "./register.scss";

Handlebars.registerPartial('title', title);
Handlebars.registerPartial('input', input);
Handlebars.registerPartial('buttonSubmit', buttonSubmit);
Handlebars.registerPartial('link', link);

export default register;
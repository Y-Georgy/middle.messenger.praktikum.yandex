import { authTitle } from '../../components/authTitle/authTitle';
import { authLayout } from '../../layouts/auth/auth';
import { authInput } from '../../components/authInput/authInput';
import { buttonSubmit } from '../../components/buttonSubmit/buttonSubmit';
import { link } from '../../components/link/link';

const container = document.querySelector('.main');
const title = authTitle('Вход');

const loginInput = authInput('login', 'Логин', 'Иванов', 'Неверный логин');
const passwordInput = authInput('password', 'Пароль','Иванов', '', 'password');

const button = buttonSubmit('Вход');
const registerLink = link('register', 'Зарегистрироваться')

const content = title + loginInput + passwordInput + button + registerLink;
const authSection = authLayout(content);

container.innerHTML = authSection;
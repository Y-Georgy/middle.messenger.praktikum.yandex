import { authTitle } from '../../components/authTitle/authTitle';
import { authLayout } from '../../layouts/auth/auth';
import { authInput } from '../../components/authInput/authInput';

const container = document.querySelector('.main');
const title = authTitle('Вход');
const loginInput = authInput('login', 'Логин', 'Иванов', 'Неверный логин');
const passwordInput = authInput('password', 'Пароль','Иванов', '', 'password');

const content = title + loginInput + passwordInput;
const authSection = authLayout(content);

container.innerHTML = authSection;
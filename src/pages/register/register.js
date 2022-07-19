import { authTitle } from '../../components/authTitle/authTitle';
import { authLayout } from '../../layouts/auth/auth';
import { authInput } from '../../components/authInput/authInput';
import { buttonSubmit } from '../../components/buttonSubmit/buttonSubmit';
import { link } from '../../components/link/link';

const container = document.querySelector('.main');
const title = authTitle('Вход');

const emailInput = authInput('email', 'Почта', 'pochta@yandex.ru', '');
const loginInput = authInput('login', 'Логин', 'ivanivanov', '');
const firstNameInput = authInput('first_name', 'Имя', 'Иван', '');
const secondNameInput = authInput('second_name', 'Фамилия', 'Иванов', '');
const phoneInput = authInput('phone', 'Телефон', '+7 (909) 967 30 30', '');
const passwordInput = authInput('password', 'Пароль','12345678', '', 'password');
const passwordCheckInput = authInput('password-check', 'Пароль (еще раз)','12345678', 'Пароли не совпадают', 'password');

const button = buttonSubmit('Зарегистрироваться');
const registerLink = link('login', 'Войти')

const content = title + emailInput + loginInput + firstNameInput + secondNameInput + phoneInput + passwordInput + passwordCheckInput + button + registerLink;
const authSection = authLayout(content);

container.innerHTML = authSection;
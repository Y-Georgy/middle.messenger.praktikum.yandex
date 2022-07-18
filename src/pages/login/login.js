import { authTitle } from "../../components/authTitle/authTitle";

const container = document.querySelector('.main');
const title = authTitle('Вход');

container.innerHTML = title;
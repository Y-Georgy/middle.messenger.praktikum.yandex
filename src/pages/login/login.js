import { authTitle } from "../../components/authTitle/authTitle";
import { authLayout } from "../../layouts/auth/auth";

const container = document.querySelector('.main');
const title = authTitle('Вход');
const authSection = authLayout(title);
container.innerHTML = authSection;
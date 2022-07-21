import profileLayout from "../../layouts/profile/profile";

const container = document.querySelector('.main');

const content = '<p></p>';
const profilePage = profileLayout(content);

container.innerHTML = profilePage;
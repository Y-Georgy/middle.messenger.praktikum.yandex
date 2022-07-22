import login from "./login";
import register from "./register"
import profile from "./profile"
import changePassword from "./changePassword";

const path = window.location.pathname;
const container = document.querySelector("#main");

if (path === "/login") container.innerHTML = login;
else if (path === "/register") container.innerHTML = register;
else if (path === "/profile") container.innerHTML = profile;
else if (path === "/change-password") container.innerHTML = changePassword;

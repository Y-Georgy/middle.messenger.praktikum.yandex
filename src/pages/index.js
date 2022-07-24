import login from "./login";
import register from "./register"
import profile from "./profile"
import changePassword from "./changePassword";
import page404 from "./404";

const path = window.location.pathname;
const container = document.querySelector("#main");

if (path === "/login") container.innerHTML = login;
else if (path === "/register") container.innerHTML = register;
else if (path === "/profile") container.innerHTML = profile;
else if (path === "/change-password") container.innerHTML = changePassword;
// else if (path === "/505") container.innerHTML = page505;
else container.innerHTML = page404;

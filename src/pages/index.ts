import loginPage from "./login";
import chat from "./chat";
import register from "./register";
import profile from "./profile";
import changePassword from "./changePassword";
import page500 from "./500";
import page404 from "./404";
import render from "../utils/render";

const path = window.location.pathname;
// const container = document.querySelector("#main") as HTMLElement;

// if (path === "/") container.innerHTML = chat;
// else if (path === "/login") container.innerHTML = login;
// else if (path === "/register") container.innerHTML = register;
// else if (path === "/profile") container.innerHTML = profile;
// else if (path === "/change-password") container.innerHTML = changePassword;
// else if (path === "/500") container.innerHTML = page500;
// else container.innerHTML = page404;

if (path === "/login") render("#main", loginPage);


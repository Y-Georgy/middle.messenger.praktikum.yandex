import loginPage from "./login";
import chatPage from "./chat";
import registerPage from "./register";
import profilePage from "./profile";
import changePasswordPage from "./changePassword";
import page500 from "./500";
import page404 from "./404";
import render from "../utils/render";

const path = window.location.pathname;

if (path === "/") render("#main", chatPage);
else if (path === "/login") render("#main", loginPage());
else if (path === "/register") render("#main", registerPage);
else if (path === "/profile") render("#main", profilePage);
else if (path === "/change-password") render("#main", changePasswordPage);
else if (path === "/500") render("#main", page500);
else render("#main", page404);

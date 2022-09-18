import loginPage from "./login";
import chatPage from "./chat";
import registerPage from "./register";
import profilePage from "./profile";
import changePasswordPage from "./changePassword";
import page500 from "./500";
import page404 from "./404";
import { Router } from "../modules/Router/Router";

const mainElem = document.createElement("main");
mainElem.id = "main";
document.body.appendChild(mainElem);

const router = new Router("body");
router
  .use("/", chatPage())
  .use("/login", loginPage())
  .use("/register", registerPage())
  .use("/profile", profilePage())
  .use("/change-password", changePasswordPage())
  .use("/500", page500())
  .use("*", page404())
  .start();

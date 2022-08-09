import Handlebars from "handlebars";
import template from "./template.hbs";
import title from "../../components/authTitle";
import input from "../../components/authInput";
// import buttonSubmit from "../../components/buttonSubmit";
import link from "../../components/link";
import * as styles from "./styles.module.scss";

Handlebars.registerPartial("title", title);
Handlebars.registerPartial("input", input);
// Handlebars.registerPartial("buttonSubmit", buttonSubmit);
Handlebars.registerPartial("link", link);

export default template({ styles });

// import Component from "../../utils/Component";
// import ButtonSubmit from "../../components/buttonSubmit";

// // export default (props) => template({ ...props, styles });

// class LoginPage extends Component {
//   constructor(props) {
// 		// Создаём враппер дом-элемент button
//     super("section", props);
//   }

//   render() {
//     return template({ ...this.props, styles });
//   }
// }

// const loginPage = new LoginPage({
//   title: `<h1>Title</h1>`,
//   buttonSubmit: new ButtonSubmit({
//     text: "Вход"
//   })
// });

// export default loginPage();

// // const button = new Button({
// //   text: 'Вход',
// // });

// // render(".app", button);

// // // Через секунду контент изменится сам, достаточно обновить пропсы
// // setTimeout(() => {
// // button.setProps({
// //   text: 'Click me, please',
// // });
// // }, 1000);

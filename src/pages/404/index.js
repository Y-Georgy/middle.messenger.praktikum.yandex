import Handlebars from "handlebars";
import template from "./template.hbs";
import link from "../../components/link";
import * as styles from "./styles.module.scss";

Handlebars.registerPartial("link", link);

export default template({ styles });

import auth from "./auth.hbs"
import "./auth.scss";

export const authLayout = ( content ) => (
  auth({ content })
);
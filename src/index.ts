import "dotenv/config";
import "module-alias/register";

import App from "./app";
import AdminController from "./resourses/admins/controller";
import FormController from "./resourses/forms/controller";
import {validateEnv} from "./utils/validate";

validateEnv();

const app = new App(
  [new AdminController(), new FormController()],
  Number(process.env.PORT)
);

app.listen();
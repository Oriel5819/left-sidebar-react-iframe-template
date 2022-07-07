import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import connect from "./database/connect";
import menuRoutes from "./routes/menu.route";
import submenuRoutes from "./routes/submenu.route";
import deviceRoutes from "./routes/devise.route";
import redRoutes from "./routes/red.route";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5500;

const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

// CONNECTING TO THE DATABASE
connect();

// ROUTES
menuRoutes(app, "/menu");
submenuRoutes(app, "/submenu");
deviceRoutes(app, "/colaborator/device");
redRoutes(app, "/colaborator/red");

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

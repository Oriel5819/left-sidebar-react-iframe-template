import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { PORT } from "./config/constants";
import menuRoutes from "./routes/menu.route";
import submenuRoutes from "./routes/submenu.route";
import { databaseConnection } from "./database/connect";

const port = PORT || 5500;

const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

// CONNECTING TO THE DATABASE
databaseConnection();

// ROUTES
menuRoutes(app, "/menu");
submenuRoutes(app, "/submenu");

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

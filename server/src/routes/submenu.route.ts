import { Express } from "express";
import {
  createSubmenu,
  editSubmenu,
  removeSubmenu,
} from "../controllers/submenu.controller";

export default function submenuRoutes(app: Express, submenuRoot: string) {
  app.post(submenuRoot + "/create/:menuid", createSubmenu);
  app.put(submenuRoot + "/edit/:menuid/:submenuid", editSubmenu);
  app.delete(submenuRoot + "/delete/:menuid/:submenuid", removeSubmenu);
}

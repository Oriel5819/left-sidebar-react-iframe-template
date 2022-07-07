import { Express, Request, Response, NextFunction, Router } from "express";
import createSubmenu, {
  editSubmenu,
  removeSubmenu,
} from "../controllers/submenu.controller";

export default function submenuRoutes(app: Express, submenuRoot: string) {
  app.post(submenuRoot + "/create", createSubmenu);
  app.put(submenuRoot + "/edit/:id", editSubmenu);
  app.delete(submenuRoot + "/delete/:menuid/:submenuid", removeSubmenu);
}

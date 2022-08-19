import { Express } from "express";

import {
  getMenus,
  createMenu,
  editMenu,
  removeMenu,
} from "../controllers/menu.controller";

export default function menuRoutes(app: Express, menuRoot: String) {
  app.get(menuRoot + "/", getMenus);
  app.post(menuRoot + "/create", createMenu);
  app.put(menuRoot + "/edit/:menuid", editMenu);
  app.delete(menuRoot + "/delete/:menuid", removeMenu);
}

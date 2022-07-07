import { Express } from "express";
import getReds from "../controllers/red.controller";

export default function redRoutes(app: Express, deviceRoot: string) {
  app.get(deviceRoot, getReds);
}

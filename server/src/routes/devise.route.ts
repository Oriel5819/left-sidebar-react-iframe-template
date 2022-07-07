import { Express } from "express";
import getDevices from "../controllers/device.controller";

export default function deviceRoutes(app: Express, deviceRoot: string) {
  app.get(deviceRoot, getDevices);
}

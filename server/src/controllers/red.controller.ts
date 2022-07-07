import { Request, Response, NextFunction } from "express";

async function getReds(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json([{ message: "your are in red controller" }]);
    // console.log("here");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export default getReds;

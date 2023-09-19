import express, { Express } from "express";
import authRouter from "./auth";
import siteRouter from "./site";
import borrowerRouter from "./borrower";
import authMiddleware from "../app/middlewares/auth.middleware";
import { socketMiddleware } from "..";

const router = express.Router();

export default function route(app: Express) {
  const routeApi = process.env.ROUTE_API;

  // Use prefix for all routes
  app.use(`/${routeApi}`, router);

  // Public routes
  router.use("/auth", authRouter);

  router.use("/", authMiddleware, siteRouter);
  router.use("/borrower", socketMiddleware, borrowerRouter);

  router.all("*", (req, res) => {
    return res.status(404).json({
      message: `Can't find ${req.originalUrl} with method ${req.method} on the server!`,
    });
  });
}

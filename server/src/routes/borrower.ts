import express from "express";
import { socketMiddleware } from "..";

const borrowerController = require("../app/controllers/borrower.controller");
const router = express.Router();

router.post("/create", borrowerController.create);

export default router;

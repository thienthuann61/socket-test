import express from "express";

const loginController = require("../app/controllers/auth.controller");
const router = express.Router();

router.post("/login", loginController.login);

export default router;

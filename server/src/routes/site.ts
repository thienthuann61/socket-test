import express from "express";

const siteController = require("../app/controllers/site.controller");
const router = express.Router();

router.get("/dashboard/report", siteController.dashboardReport);

export default router;

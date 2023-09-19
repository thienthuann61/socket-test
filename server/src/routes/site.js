"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const siteController = require("../app/controllers/site.controller");
const router = express_1.default.Router();
router.get("/dashboard/report", siteController.dashboardReport);
exports.default = router;

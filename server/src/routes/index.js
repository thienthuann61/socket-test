"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const site_1 = __importDefault(require("./site"));
const borrower_1 = __importDefault(require("./borrower"));
const auth_middleware_1 = __importDefault(require("../app/middlewares/auth.middleware"));
const __1 = require("..");
const router = express_1.default.Router();
function route(app) {
    const routeApi = process.env.ROUTE_API;
    // Use prefix for all routes
    app.use(`/${routeApi}`, router);
    // Public routes
    router.use("/auth", auth_1.default);
    router.use("/", auth_middleware_1.default, site_1.default);
    router.use("/borrower", __1.socketMiddleware, borrower_1.default);
    router.all("*", (req, res) => {
        return res.status(404).json({
            message: `Can't find ${req.originalUrl} with method ${req.method} on the server!`,
        });
    });
}
exports.default = route;

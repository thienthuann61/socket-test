"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const services_1 = require("./utils/services");
const socket_1 = require("./utils/socket");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require("body-parser");
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
    },
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use((0, cors_1.default)());
// socket connect
(0, socket_1.socketConnect)(io);
const socketMiddleware = (req, res, next) => {
    req.io = io;
    next();
};
exports.socketMiddleware = socketMiddleware;
// Connect to database
(0, services_1.connect)();
// Declare routes
(0, routes_1.default)(app);
httpServer.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

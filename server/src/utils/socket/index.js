"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketConnect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function socketConnect(io) {
    io.use((socket, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const token = socket.handshake.query.token;
            const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "");
            socket.userId = payload.id;
            next();
        }
        catch (err) { }
    }));
    io.on("connection", function (socket) {
        socket.on("disconnect", function () { });
        socket.on("newBorrower", (data) => __awaiter(this, void 0, void 0, function* () {
            console.log(data);
        }));
    });
}
exports.socketConnect = socketConnect;

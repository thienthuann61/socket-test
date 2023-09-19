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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.headers.authorization)
                throw "Forbidden!!";
            const token = req.headers.authorization.split(" ")[1];
            const payload = yield jwt.verify(token, process.env.SECRET_KEY);
            req.userInfo = payload;
            next();
        }
        catch (err) {
            res.status(401).json({
                message: "Forbidden 🚫🚫🚫",
            });
        }
    });
}
exports.default = authMiddleware;

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
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.login = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body || {};
        const user = yield user_model_1.default.findOne({
            email,
        }).select("+password");
        //   User not found
        if (!user) {
            return res.status(400).json({
                message: "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.",
            });
        }
        //   Check password
        const comparePassword = bcrypt_1.default.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({
                message: "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.",
            });
        }
        //   Create token
        const token = yield jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY || "", {
            expiresIn: 60 * 60 * 24 * 2,
        });
        res.json({
            token,
        });
    });
};

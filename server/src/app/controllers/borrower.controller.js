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
const borrower_1 = __importDefault(require("../models/borrower"));
exports.create = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { io } = req;
        try {
            const { first_name, last_name, loan_amount } = req.body;
            const borrower = yield borrower_1.default.create({
                first_name,
                last_name,
                loan_amount,
            });
            io === null || io === void 0 ? void 0 : io.emit("newBorrower", borrower);
            return res.status(200).json(borrower);
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    });
};

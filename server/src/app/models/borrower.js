"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BorrowerSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true, "Last Name is required"],
        trim: true,
    },
    loan_amount: {
        type: Number,
        required: [true, "Loan amount is required"],
    },
    status: {
        type: String,
        enum: {
            values: ["pending", "rejected", "approved"],
            message: "{VALUE} is not supported",
        },
        default: "pending",
    },
}, {
    timestamps: true,
});
const Borrower = mongoose_1.default.model("Borrower", BorrowerSchema);
exports.default = Borrower;

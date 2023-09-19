"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pwdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,}$/;
const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const UserSchema = new mongoose_1.default.Schema({
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
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [emailRegex, "Invalid Email"],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
        match: [
            pwdRegex,
            "Make sure your password has at least 8 characters including at least one uppercase letter, one lowercase letter, one number and one special character",
        ],
        trim: true,
    },
    role: {
        type: String,
        enum: {
            values: ["admin", "super_admin", "retail", "user"],
            message: "{VALUE} is not supported",
        },
        default: "user",
        trim: true,
        lowercase: true,
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        },
    },
    timestamps: true,
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;

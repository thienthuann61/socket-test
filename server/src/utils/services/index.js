"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../../app/models/user.model"));
const borrower_1 = __importDefault(require("../../app/models/borrower"));
const constants_1 = require("../constants");
const { connection } = mongoose_1.default;
function connect() {
    mongoose_1.default.set("strictQuery", false);
    const MONGODB_URL_LOCAL = `${process.env.MONGO_URI}${process.env.MONGO_DB}`;
    mongoose_1.default.connect(MONGODB_URL_LOCAL);
    connection.on("connected", () => {
        user_model_1.default.find({}).then((userList) => {
            if (userList.length)
                return;
            const password = bcrypt_1.default.hashSync("Admin@123456", 10);
            // Create initial user
            user_model_1.default.create(constants_1.USER_INIT.map((user) => (Object.assign(Object.assign({}, user), { password }))));
        });
        borrower_1.default.find({}).then((browserList) => {
            if (browserList.length)
                return;
            // Create initial user
            borrower_1.default.create(constants_1.BORROWER_INIT);
        });
        console.log("Mongo Connection Established");
    });
    connection.on("reconnected", () => {
        console.log("Mongo Connection Reestablished");
    });
    connection.on("disconnected", () => {
        console.log("Mongo Connection Disconnected");
        console.log("Trying to reconnect to Mongo ...");
        setTimeout(() => {
            mongoose_1.default.connect(MONGODB_URL_LOCAL, {
                keepAlive: true,
                socketTimeoutMS: 3000,
                connectTimeoutMS: 3000,
            });
        }, 3000);
    });
    connection.on("close", () => {
        console.log("Mongo Connection Closed");
    });
    connection.on("error", (error) => {
        console.log("Mongo Connection ERROR: " + error);
    });
}
exports.connect = connect;

import mongoose, { CallbackError } from "mongoose";
import bcrypt from "bcrypt";
import User from "../../app/models/user.model";
import Borrower from "../../app/models/borrower";
import { BORROWER_INIT, USER_INIT } from "../constants";
const { connection } = mongoose;

export function connect() {
  mongoose.set("strictQuery", false);

  const MONGODB_URL_LOCAL = `${process.env.MONGO_URI}${process.env.MONGO_DB}`;

  mongoose.connect(MONGODB_URL_LOCAL);

  connection.on("connected", () => {
    User.find({}).then((userList) => {
      if (userList.length) return;

      const password = bcrypt.hashSync("Admin@123456", 10);

      // Create initial user
      User.create(
        USER_INIT.map((user) => ({
          ...user,
          password,
        }))
      );
    });

    Borrower.find({}).then((browserList) => {
      if (browserList.length) return;

      // Create initial user
      Borrower.create(BORROWER_INIT);
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
      mongoose.connect(MONGODB_URL_LOCAL, {
        keepAlive: true,
        socketTimeoutMS: 3000,
        connectTimeoutMS: 3000,
      });
    }, 3000);
  });

  connection.on("close", () => {
    console.log("Mongo Connection Closed");
  });

  connection.on("error", (error: Error) => {
    console.log("Mongo Connection ERROR: " + error);
  });
}

import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { SocketCustom } from "../types";

export function socketConnect(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  io.use(async (socket: any, next) => {
    try {
      const token = socket.handshake.query.token;
      const payload: any = jwt.verify(token, process.env.SECRET_KEY || "");

      socket.userId = payload.id;
      next();
    } catch (err) {}
  });

  io.on("connection", function (socket: SocketCustom) {
    socket.on("disconnect", function () {});

    socket.on("newBorrower", async (data) => {
      console.log(data);
    });
  });
}

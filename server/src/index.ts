import express, { Express, NextFunction, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { connect } from "./utils/services";
import { socketConnect } from "./utils/socket";
import route from "./routes";
import cors from "cors";
import bodyParser = require("body-parser");
import { UserRequest } from "./utils/types";

dotenv.config();
const port = process.env.PORT || 3000;

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());

// socket connect
socketConnect(io);

export const socketMiddleware = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  req.io = io;
  next();
};

// Connect to database
connect();

// Declare routes
route(app);

httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

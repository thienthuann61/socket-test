import { Request } from "express";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export interface UserRequest extends Request {
  userInfo?: iUser;
  io?: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}

export interface iUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: "super_admin" | "admin" | "user" | "retail";
}

export type Borrower = {
  first_name: string;
  last_name: string;
  loan_amount: number;
  status: "pending" | "rejected" | "approved";
};

export interface SocketCustom extends Socket {
  userId?: string;
}

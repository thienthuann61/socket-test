import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

export type SocketSetup = Socket<DefaultEventsMap, DefaultEventsMap> | null;

export type DashboardReport = {
  readonly id: number;
  title: string;
  quantity: number;
};

export type CreateBorrower = {
  first_name: string;
  last_name: string;
  loan_amount: string;
};

export type FormLogin = {
  email: string;
  password: string;
};

export type Token = {
  token: string;
};

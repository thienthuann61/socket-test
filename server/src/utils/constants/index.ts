import { Borrower } from "../types";

export const BORROWER_INIT: Borrower[] = [
  {
    first_name: "Thien",
    last_name: "Thuan",
    loan_amount: 3000,
    status: "approved",
  },
  {
    first_name: "Kha",
    last_name: "Le",
    loan_amount: 10000000000,
    status: "rejected",
  },
  {
    first_name: "Mang",
    last_name: "Nguyen",
    loan_amount: 5000,
    status: "rejected",
  },
  {
    first_name: "Bao",
    last_name: "Nguyen",
    loan_amount: 31000,
    status: "pending",
  },
];

export const USER_INIT = [
  {
    email: "admin@gmail.com",
    first_name: "Admin",
    last_name: "Test",
    role: "super_admin",
  },
  {
    email: "thuan@gmail.com",
    first_name: "Thien",
    last_name: "Thuan",
    role: "admin",
  },
  {
    email: "kha@gmail.com",
    first_name: "Kha",
    last_name: "Le",
    role: "admin",
  },
  {
    email: "mang@gmail.com",
    first_name: "Mang",
    last_name: "Nguyen",
    role: "admin",
  },
  {
    email: "bao@gmail.com",
    first_name: "Bao",
    last_name: "Nguyen",
    role: "admin",
  },
];

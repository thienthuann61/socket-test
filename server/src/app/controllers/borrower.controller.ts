import { Response } from "express";
import Borrower from "../models/borrower";
import { UserRequest } from "../../utils/types";

exports.create = async function (req: UserRequest, res: Response) {
  const { io } = req;

  try {
    const { first_name, last_name, loan_amount } = req.body;
    const borrower = await Borrower.create({
      first_name,
      last_name,
      loan_amount,
    });

    io?.emit("newBorrower", borrower);

    return res.status(200).json(borrower);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

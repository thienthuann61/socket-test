import { Request, Response } from "express";
import Borrower from "../models/borrower";

exports.dashboardReport = async function (req: Request, res: Response) {
  // Filter
  const matches = {};

  const data = await Borrower.aggregate([
    {
      $match: matches,
    },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const total = data.reduce((result, item) => (result += item.count || 0), 0);
  const dataReport = data.reduce(
    (result, item) => ({ ...result, [item._id]: item.count || 0 }),
    { total }
  );

  return res.status(200).json(dataReport);
};

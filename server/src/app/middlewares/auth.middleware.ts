import { NextFunction, Response } from "express";
import { UserRequest } from "../../utils/types";

const jwt = require("jsonwebtoken");

export default async function authMiddleware(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.headers.authorization) throw "Forbidden!!";
    const token = req.headers.authorization.split(" ")[1];

    const payload = await jwt.verify(token, process.env.SECRET_KEY);
    req.userInfo = payload;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Forbidden 🚫🚫🚫",
    });
  }
}

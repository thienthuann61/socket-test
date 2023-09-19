import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

exports.login = async function (req: Request, res: Response) {
  const { email, password } = req.body || {};

  const user = await User.findOne({
    email,
  }).select("+password");

  //   User not found
  if (!user) {
    return res.status(400).json({
      message:
        "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.",
    });
  }

  //   Check password
  const comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return res.status(400).json({
      message:
        "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.",
    });
  }

  //   Create token
  const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY || "", {
    expiresIn: 60 * 60 * 24 * 2,
  });

  res.json({
    token,
  });
};

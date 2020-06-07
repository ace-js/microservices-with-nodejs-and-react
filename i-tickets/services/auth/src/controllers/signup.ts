import { Request, Response } from "express";

import User from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

export default async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const exists = await User.exists({ email });

  if (exists) {
    throw new BadRequestError("Email already in use");
  }

  const user = User.build({ email, password });
  await user.save();

  return res.status(201).send(user);
};

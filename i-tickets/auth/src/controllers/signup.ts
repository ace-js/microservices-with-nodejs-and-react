import { Request, Response } from 'express';
import { BadRequestError } from '@ab-itickets/common';

import User from '../models/user';

export default async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const exists = await User.exists({ email });

  if (exists) {
    throw new BadRequestError('Email already in use');
  }

  const user = User.build({ email, password });
  await user.save();

  // Store jwt on session object
  req.session = {
    jwt: user.generateAuthToken()
  };

  return res.status(201).send(user);
};

import { Request, Response } from 'express';
import { BadRequestError } from '@ab-itickets/common';

import User from '../models/user';
import { Password } from '../utils/password';

export default async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await Password.compare(user.password, password))) {
    throw new BadRequestError('Authentication failed');
  }

  req.session = {
    jwt: user.generateAuthToken()
  };

  return res.status(200).send(user);
};

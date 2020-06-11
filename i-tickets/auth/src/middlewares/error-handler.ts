import { Request, Response, NextFunction } from 'express';

import CustomError from '../errors/custom-error';

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.log(err.message);
  res.status(500).send({
    errors: [{ message: 'Something went wrong' }]
  });
};

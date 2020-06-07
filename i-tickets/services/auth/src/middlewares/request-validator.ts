import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

import { RequestValidationError } from '../errors/request-validation-error';

export default (validations: ValidationChain[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};

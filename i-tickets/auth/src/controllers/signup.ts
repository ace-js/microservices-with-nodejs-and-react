import { Request, Response } from 'express';
import { DatabaseConnectionError } from '../errors/database-validation-error';

export default (req: Request, res: Response) => {
  console.log('Creating user...');
  throw new DatabaseConnectionError();
  return res.send({});
};

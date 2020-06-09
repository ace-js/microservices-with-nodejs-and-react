import { Request, Response } from 'express';

export default (req: Request, res: Response) => {
  return res.send({ currentUser: req.currentUser || null });
};

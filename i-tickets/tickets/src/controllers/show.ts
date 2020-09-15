import { Request, Response } from "express";
import { NotFoundError } from "@ab-itickets/common";

import { Ticket } from "../models/ticket";

export default async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) throw new NotFoundError();

  return res.status(200).send(ticket);
};

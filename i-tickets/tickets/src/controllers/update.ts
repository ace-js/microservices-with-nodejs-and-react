import { Request, Response } from "express";
import { NotFoundError, UnauthorizedError } from "@ab-itickets/common";

import { Ticket } from "../models/ticket";

export default async (req: Request, res: Response) => {
  const { title, price } = req.body;
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) throw new NotFoundError();
  if (ticket.userId !== req.currentUser!.id)
    throw new UnauthorizedError(
      "You cannot update a ticket that doesn\t belong to you"
    );

  ticket.set({
    title,
    price,
  });

  await ticket.save();
  return res.status(200).send(ticket);
};

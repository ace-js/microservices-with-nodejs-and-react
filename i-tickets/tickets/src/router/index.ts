import express from "express";
import {
  isAuthMiddleware,
  requestValidationMiddleware,
} from "@ab-itickets/common";

import createTicketController from "../controllers/create";
import getAllTicketsController from "../controllers/get-all";
import showTicketController from "../controllers/show";
import updateTicketController from "../controllers/update";

import createTicketSchema from "../request-validation-schemas/create";
import showTicketSchema from "../request-validation-schemas/show";
import updateTicketSchema from "../request-validation-schemas/update";

const router = express.Router();

router.post(
  "/",
  isAuthMiddleware,
  requestValidationMiddleware(createTicketSchema),
  createTicketController
);

router.get("/", isAuthMiddleware, getAllTicketsController);

router.get(
  "/:id",
  isAuthMiddleware,
  requestValidationMiddleware(showTicketSchema),
  showTicketController
);

router.put(
  "/:id",
  isAuthMiddleware,
  requestValidationMiddleware(updateTicketSchema),
  updateTicketController
);

export default router;

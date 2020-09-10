import express from "express";
import { isAuthMiddleware } from "@ab-itickets/common";

import createTicketController from "../controllers/create";

const router = express.Router();

router.post("/", isAuthMiddleware, createTicketController);

export default router;

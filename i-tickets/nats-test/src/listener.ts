import nats from "node-nats-streaming";
import { randomBytes } from "crypto";

import { TicketCreatedListener } from "./ticket-created-listener.class";

console.clear();

const stan = nats.connect("itickets", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listened connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

// listen interupt signal
process.on("SIGINT", () => stan.close());
// listen terminate signal
process.on("SIGTERM", () => stan.close());

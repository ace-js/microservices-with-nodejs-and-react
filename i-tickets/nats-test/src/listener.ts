import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

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

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDurableName("listener-subscription-name"); // set a durable subscription and returns after restart all events not processed (acknowleged) by the subscription name in case of service unavailable for a while

  const subscription = stan.subscribe(
    "ticket:created",
    "listener-queue-group",
    options
  ); // queue group handle the fact that only one instence of this queue group handle a specific event (in case of multiple µservice replicas)

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack(); // tels that event has been properly handled by this queue group
  });
});

// listen interupt signal
process.on("SIGINT", () => stan.close());
// listen terminate signal
process.on("SIGTERM", () => stan.close());

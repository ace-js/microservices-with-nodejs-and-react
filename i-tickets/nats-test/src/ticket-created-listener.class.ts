import { Stan, Message } from "node-nats-streaming";

import { Listener } from "./listener.class";

export class TicketCreatedListener extends Listener {
  subject: string = "ticket:created";
  queueGroupName: string = "ticket-created-queue-group";

  constructor(client: Stan) {
    super(client);
  }

  onMessage(data: any, msg: Message): void {
    console.log(data);
    msg.ack();
  }
}

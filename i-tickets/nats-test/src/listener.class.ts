import { Stan, Message, SubscriptionOptions } from "node-nats-streaming";

export abstract class Listener {
  private readonly client: Stan;
  protected ackWait: number = 5000; // ms => 5sec

  protected abstract subject: string;
  protected abstract queueGroupName: string;
  protected abstract onMessage(data: any, msg: Message): void;

  constructor(client: Stan) {
    this.client = client;
  }

  private subscriptionOptions(): SubscriptionOptions {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName); // set a durable subscription and returns after restart all events not processed (acknowleged) by the subscription name in case of service unavailable for a while
  }

  listen(): void {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName, // queue group handle the fact that only one instence of this queue group handle a specific event (in case of multiple µservice replicas)
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  private parseMessage(msg: Message): any {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}

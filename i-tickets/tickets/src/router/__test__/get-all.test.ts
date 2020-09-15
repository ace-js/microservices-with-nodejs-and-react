import request from "supertest";

import app from "../../app";

it("get list of tickets", async () => {
  await global.createTicket("test", 22);
  await global.createTicket("test2", 99);
  await global.createTicket("test3", 119.99);

  const response = await request(app)
    .get("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).toEqual(200);
  expect(response.body.tickets.length).toEqual(3);
});

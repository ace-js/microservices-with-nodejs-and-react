import request from "supertest";

import app from "../../app";
import { Ticket } from "../../models/ticket";

it("has a route handler listening for /api/tickets POST requests ", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(404);
});

it("can't be acces when user is not signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("can be acces when user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error for invalid title", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ price: 12.5 })
    .expect(400);
});

it("returns an error for invalid price", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test" })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test", price: -1 })
    .expect(400);
});

it("creates ticket for request with good params", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test", price: 12 })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].id).toBe(response.body.id);
});

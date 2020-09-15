import { generateObjectId } from "./../../utils/generate-objectid";
import request from "supertest";

import app from "../../app";

it("returns 401 if user is not signed in", async () => {
  await request(app)
    .put(`/api/tickets/${generateObjectId()}`)
    .send({})
    .expect(401);
});

it("can be acces when user is signed in", async () => {
  const response = await request(app)
    .put(`/api/tickets/${generateObjectId()}`)
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns 400 for invalid title or price", async () => {
  await request(app)
    .put(`/api/tickets/${generateObjectId()}`)
    .set("Cookie", global.signin())
    .send({ price: 12.5 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${generateObjectId()}`)
    .set("Cookie", global.signin())
    .send({ title: "test" })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${generateObjectId()}`)
    .set("Cookie", global.signin())
    .send({ title: "test", price: -1 })
    .expect(400);
});

it("returns 404 in case of unknown ticket", async () => {
  await request(app)
    .put(`/api/tickets/${generateObjectId()}`)
    .set("Cookie", global.signin())
    .send({ title: "toto", price: 333 })
    .expect(404);
});

it("returns 401 if the user is not the ticket owner", async () => {
  const creationResponse = await global.createTicket("test", 10);

  await request(app)
    .put(`/api/tickets/${creationResponse.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "gfdsfg", price: 12 })
    .expect(401);
});

it("update ticket for request with good params and correct user", async () => {
  const cookie = global.signin();
  const creationResponse = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "test", price: 42 })
    .expect(201);

  const response = await request(app)
    .put(`/api/tickets/${creationResponse.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "test", price: 12 })
    .expect(200);

  expect(creationResponse.body.id).toBe(response.body.id);
  expect(creationResponse.body.title).toBe(response.body.title);
  expect(creationResponse.body.price).not.toBe(response.body.price);
});

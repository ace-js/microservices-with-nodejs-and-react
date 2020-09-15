import request from "supertest";

import app from "../../app";

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

it("returns an error for invalid title", async () => {});

it("returns an error for invalid price", async () => {});

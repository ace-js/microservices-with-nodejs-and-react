import request from "supertest";

import app from "../../app";

it("has a route handler listening for /api/tickets POST requests ", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be acces when user is signed in", async () => {});

it("returns an error for invalid title", async () => {});

it("returns an error for invalid price", async () => {});

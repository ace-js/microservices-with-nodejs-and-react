import request from "supertest";

import app from "../../app";
import { generateObjectId } from "./../../utils/generate-objectid";

it("returns 400 if id is not an objectId", async () => {
  await request(app)
    .get("/api/tickets/1234")
    .set("Cookie", global.signin())
    .send()
    .expect(400);
});

it("returns 404 if ticket is not found", async () => {
  const id = generateObjectId();

  await request(app)
    .get(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(404);
});

it("return ticket if it's found", async () => {
  const creationResponse = await await global.createTicket("test", 22);

  const response = await request(app)
    .get(`/api/tickets/${creationResponse.body.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(200);

  expect(response.body).not.toBeFalsy();
  expect(response.body).toEqual(creationResponse.body);
});

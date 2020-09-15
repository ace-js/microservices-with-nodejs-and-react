import { generateObjectId } from "./../utils/generate-objectid";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import request from "supertest";

import app from "../app";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string;
      createTicket(title: string, price: number): Promise<request.Response>;
    }
  }
}

let mongo: any;
beforeAll(async () => {
  // before all our tests
  process.env.JWT_KEY = "secret";
  const mongo = new MongoMemoryServer(); // create an in memory server
  const mongoUri = await mongo.getUri(); // get its uri

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  await collections.forEach(async (collection) => {
    await collection.deleteMany({}); // delete records of the collection
  });
});

afterAll(async () => {
  await mongo?.stop();
  await mongoose.connection.close();
});

global.signin = (): string => {
  // build a JWT payload { id, email }
  const payload = {
    id: generateObjectId(),
    email: "test@test.com",
  };

  // create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: "2h" });

  // build session object
  const session = {
    jwt: token,
  };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // take json encode it in base64
  const encodedSession = Buffer.from(sessionJSON).toString("base64");

  // return a string cookie
  return "express:sess=" + encodedSession;
};

global.createTicket = (
  title: string,
  price: number
): Promise<request.Response> => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price });
};

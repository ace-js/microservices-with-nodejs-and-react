import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import app from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      signup(): Promise<string[]>;
    }
  }
}

let mongo: any;
beforeAll(async () => {
  // before all our tests
  process.env.JWT_KEY = 'secret';
  const mongo = new MongoMemoryServer(); // create an in memory server
  const mongoUri = await mongo.getUri(); // get its uri

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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

global.signup = async (): Promise<string[]> => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);

  return response.get('Set-Cookie');
};

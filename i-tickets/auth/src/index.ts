import express from 'express';
import 'express-async-errors'; // allows throwing error inan async route to avoid awaiting promise response
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import router from './routes';
import errorHandler from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.set('trust proxy', true); // trust traffic from ingress-nginx
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

app.use('/api/users', router);

// not found routes
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to mongoDB');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();

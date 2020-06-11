import express from 'express';
import 'express-async-errors'; // allows throwing error inan async route to avoid awaiting promise response
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import router from './router';
import errorHandler from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import currentUserMiddleware from './middlewares/current-user';

const app = express();

app.set('trust proxy', true); // trust traffic from ingress-nginx
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'dev-testing'
  })
);

declare global {
  namespace Express {
    interface Request {
      session: {
        jwt: string;
      } | null;
    }
  }
}

app.use(currentUserMiddleware);

app.use('/api/users', router);

// not found routes
app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;

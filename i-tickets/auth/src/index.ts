import express from 'express';
import 'express-async-errors'; // allows throwing error inan async route to avoid awaiting promise response

import { json } from 'body-parser';

import router from './routes';
import errorHandler from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(json());

app.use('/api/users', router);

// not found routes
app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});

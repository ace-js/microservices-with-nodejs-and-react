import express from 'express';

import { requestValidationMiddleware as validate } from '@ab-itickets/common';

import currentUserController from '../controllers/current-user';
import signoutController from '../controllers/signout';
import signinController from '../controllers/signin';
import signupController from '../controllers/signup';

import signupSchema from '../request-validation-schemas/signup';
import signinSchema from '../request-validation-schemas/signin';

export default express
  .Router()
  .get('/currentuser', currentUserController)
  .post('/signout', signoutController)
  .post('/signin', validate(signinSchema), signinController)
  .post('/signup', validate(signupSchema), signupController);

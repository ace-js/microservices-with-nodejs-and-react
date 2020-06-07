import express from 'express';

import validate from '../middlewares/request-validator';

import currentUserController from '../controllers/current-user';
import signoutController from '../controllers/signout';
import signinController from '../controllers/signin';
import signupController from '../controllers/signup';

import signupSchema from '../request-validation-schemas/signup';

export default express
  .Router()
  .get('/currentuser', currentUserController)
  .post('/signout', signoutController)
  .post('/signin', signinController)
  .post('/signup', validate(signupSchema), signupController);

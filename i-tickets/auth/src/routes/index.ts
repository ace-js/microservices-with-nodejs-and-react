import express from 'express';

import validate from '../middlewares/schema-validator'

import currentUserController from '../controllers/current-user';
import signoutController from '../controllers/signout';
import signinController from '../controllers/signin';
import signupController from '../controllers/signup';

import signupSchema from '../schemas/signup'

export default express
  .Router()
  .get('/currentuser', currentUserController)
  .post('/signout', signoutController)
  .post('/signin', signinController)
  .post('/signup', signupSchema, validate, signupController);

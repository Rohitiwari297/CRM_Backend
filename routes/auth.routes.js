import express from 'express'
import {signin, signup} from '../controllers/auth.controller.js'
import validateUserrequestBody from '../middlewares/verifyUserRequestBody.js';

const route = express.Router();

route.post('/auth/signup',validateUserrequestBody, signup);
route.post('/auth/signin', signin);


export default route;


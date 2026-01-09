import express from 'express';
import { getAllUsers, getLoggedInUser, updateUser } from '../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../middlewares/authJwt.js';
import { validateUserStatusAndUserType } from '../middlewares/verifyUserRequestBody.js';

const route = express.Router();


//  all are admin rights
route.get('/users', getAllUsers);
route.get('/user/:userId',verifyToken, getLoggedInUser);
route.put('/user/:userId',verifyToken, validateUserStatusAndUserType, updateUser);

// router.put('/profile', updateUserProfile);

export default route;

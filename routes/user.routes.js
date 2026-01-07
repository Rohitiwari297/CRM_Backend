import express from 'express';
import { getAllUsers, getLoggedInUser, updateUser } from '../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../middlewares/authJwt.js';
import { validateUserStatusAndUserType } from '../middlewares/verifyUserRequestBody.js';

const router = express.Router();


//  all are admin rights
router.get('/users', getAllUsers);
router.get('/user/:userId',verifyToken, getLoggedInUser);
router.put('/user/:userId',verifyToken, validateUserStatusAndUserType, updateUser);

// router.put('/profile', updateUserProfile);

export default router;

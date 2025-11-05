import express from 'express';
import { getAllUsers, getLoggedInUser } from '../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../middlewares/authJwt.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/user/:userId',verifyToken, getLoggedInUser)
// router.put('/profile', updateUserProfile);

export default router;

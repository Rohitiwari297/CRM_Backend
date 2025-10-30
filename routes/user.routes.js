import express from 'express';
import { getAllUsers } from '../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../middlewares/authJwt.js';

const router = express.Router();

router.get('/profile', verifyToken, isAdmin, getAllUsers);
// router.put('/profile', updateUserProfile);

export default router;

import express from 'express';
import { getAllUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/profile', getAllUsers);
// router.put('/profile', updateUserProfile);

export default router;

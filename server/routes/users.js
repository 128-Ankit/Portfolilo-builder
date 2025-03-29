import express from 'express';
import {
    registerUser,
    getUsers,
    getUserById,
    updateUserProfile
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers);

router.route('/profile')
    .put(protect, updateUserProfile);

router.route('/:id')
    .get(protect, admin, getUserById);

export default router;
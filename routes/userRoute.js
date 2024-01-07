import express from 'express';
import UserController from '../controller/userController.js';

const router = express.Router();
// Example routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/:userId', UserController.getUserProfile);
router.get('/saveLiked', UserController.saveLiked);

export default router;
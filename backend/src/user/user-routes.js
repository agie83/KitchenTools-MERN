import express from 'express';
import UserController from './user-controller';

const router = express.Router();

router.get('/users', UserController.get);
router.patch('/users', UserController.patch);

export default router;

import express from 'express';
import LoginController from './login-controller';

const router = express.Router();

router.post('/login', LoginController.post);

export default router;

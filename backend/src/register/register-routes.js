import express from 'express';
import RegisterController from './register-controller';

const router = express.Router();

router.post('/register', RegisterController.create);

export default router;

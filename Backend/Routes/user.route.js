
import express from 'express';
import { signup } from '../Controller/user.controller.js';
import { loginUser } from '../login.controller.js';

const router = express.Router();

router.post('/', signup);
router.post('/login', loginUser);

export default router;

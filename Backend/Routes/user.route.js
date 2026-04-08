
import express from 'express';
import { signup } from '../Controller/user.controller.js';
import { loginUser } from '../login.controller.js';

const router = express.Router();

router.post('/', signup);
router.post('/login', loginUser);
router.get('/ping', (req, res) => res.json({ status: 'ok' }));

export default router;

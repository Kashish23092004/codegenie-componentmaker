import express from 'express';
import { signup } from '../Controller/user.controller.js';

const router = express.Router();

router.post('/', signup);

export default router;

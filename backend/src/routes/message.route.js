import express from 'express';
import protectAuth from '../middleware/auth.middleware.js';
import { getUsers,getMessage,sendMessage } from '../controllers/message.controller.js';
const router = express.Router();
router.get('/users',protectAuth,getUsers )
router.get('/:id',protectAuth,getMessage )
router.post('/send/:id',protectAuth,sendMessage )

export default router;
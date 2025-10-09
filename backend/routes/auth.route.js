import express from 'express';

//controllers imports
import {signUp,login,logout} from '../controllers/auth.controller.js';

const router=express.Router();

router.post('/signUp',signUp);
router.post('/login',login);
router.post('/logout',logout);

export default router;
import express from 'express';

//controllers imports
import {signUp} from '../controllers/auth.controller.js';

const router=express.Router();

router.post('/signUp',signUp);

export default router;
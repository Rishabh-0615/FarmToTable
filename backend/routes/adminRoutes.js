import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import {getUnverifiedFarmers, verifyFarmer} from '../controllers/adminControllers.js';

const router=express.Router();
router.get("/verify-farmer", getUnverifiedFarmers);
router.put("/verify-farmer/:id", verifyFarmer);

export default router;
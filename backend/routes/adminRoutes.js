import express from 'express';
import { isAdminAuth } from '../middlewares/isAdminAuth.js';
import {getUnverifiedFarmers, verifyFarmer, adminLogin, logoutAdmin } from '../controllers/adminControllers.js';
import { OrderDetails } from '../models/orderDetailsModel.js';

const router=express.Router();
router.post("/admin-login", adminLogin);
router.get("/verify-farmer",isAdminAuth, getUnverifiedFarmers);
router.put("/verify-farmer/:userId",isAdminAuth, verifyFarmer);
router.get("/logout",isAdminAuth, logoutAdmin);



  
export default router;
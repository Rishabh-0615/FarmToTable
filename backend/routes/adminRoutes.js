import express from 'express';
import { isAdminAuth } from '../middlewares/isAdminAuth.js';
import {getUnverifiedFarmers, verifyFarmer, adminLogin, logoutAdmin, getUnverifiedDelivery, verifyDelivery } from '../controllers/adminControllers.js';


const router=express.Router();
router.post("/admin-login", adminLogin);
router.get("/verify-farmer", getUnverifiedFarmers);
router.put("/verify-farmer/:userId", verifyFarmer);
router.get("/verify-delivery",isAdminAuth, getUnverifiedDelivery);
router.put("/verify-delivery/:userId",isAdminAuth, verifyDelivery);
router.get("/logout",isAdminAuth, logoutAdmin);



export default router;
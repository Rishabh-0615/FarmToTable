import express from 'express';
import { isAdminAuth } from '../middlewares/isAdminAuth.js';
import {getUnverifiedFarmers, verifyFarmer, adminLogin, logoutAdmin, getUnverifiedDelivery, verifyDelivery } from '../controllers/adminControllers.js';
import { adminController } from '../controllers/adminControllers2.js';

const router=express.Router();
router.post("/admin-login", adminLogin);
router.get("/verify-farmer",isAdminAuth, getUnverifiedFarmers);
router.put("/verify-farmer/:userId",isAdminAuth, verifyFarmer);
router.get("/verify-delivery",isAdminAuth, getUnverifiedDelivery);
router.put("/verify-delivery/:userId",isAdminAuth, verifyDelivery);
router.get("/logout",isAdminAuth, logoutAdmin);


router.get('/cities', 
    isAdminAuth, 
    adminController.getAllCities
  );
  
  // Orders Routes
  router.get('/orders', 
    isAdminAuth,
    adminController.getOrdersByCity
  );
  
  // Delivery Assignment Routes
  router.post('/assign-delivery', 
    isAdminAuth, 
    adminController.assignDelivery
  );
  
  router.get('/delivery-boys', 
    isAdminAuth,
    adminController.getAllDeliveryBoys
  );

export default router;
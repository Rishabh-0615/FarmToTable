import express from 'express';
import { adminController3 } from '../controllers/adminControllers3.js';
import { deliveryBoyController2 } from '../controllers/deliveryControllers2.js';
import { isAdminAuth } from '../middlewares/isAdminAuth.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

// Admin Routes
router.get('/unassigned-orders', 
  isAdminAuth,
  adminController3.getUnassignedOrders
);

router.get('/available-delivery-boys', 
    isAdminAuth,
  adminController3.getAvailableDeliveryBoys
);

router.post('/assign-order', 
    isAdminAuth, 
  adminController3.assignOrderToDeliveryBoy
);

// Delivery Boy Routes
router.get('/assigned-orders', 
    isAuth,
  deliveryBoyController2.getAssignedOrders
);

router.put('/update-order-status', 
    isAuth ,
  deliveryBoyController2.updateOrderStatus
);

export default router;
import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { deliveryController } from '../controllers/deliveryControllers.js';
import { DeliveryAssignment } from '../models/deliveryModel.js';
import { OrderDetails } from '../models/orderDetailsModel.js';
import {User} from '../models/userModel.js'
const router=express.Router();


router.get('/delivery-boys', isAuth, deliveryController.getAllDeliveryBoys);
router.get('/delivery-boys/available', isAuth, deliveryController.getAvailableDeliveryBoys);
router.get('/pending', isAuth, deliveryController.getPendingDeliveries);
router.post('/assign', isAuth, deliveryController.assignDelivery);
router.put('/status', isAuth, deliveryController.updateDeliveryStatus);
router.get('/assignments/:deliveryBoyId', isAuth, deliveryController.getDeliveryBoyAssignments);


router.get('/getPendingDeliveries', async (req, res) => {
    try {
      const orders = await OrderDetails.find({ deliveryStatus: 'PROCESSING' })
        .populate('userId', 'name mobile')
        .populate('cartItems.productId', 'name price image city ') // Include consumer name and number
        .select('cartItems location deliveryStatus userId'); // Select only required fields
  
      return res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ message: 'Failed to fetch orders' });
    }
  });
  
export default router;
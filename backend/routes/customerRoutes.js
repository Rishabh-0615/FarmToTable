import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { addCart, clearCart,  getCart,  getDetails,   getUserLocation, mockApi,    saveOrder, searchProducts, updateLocation } from '../controllers/customerControllers.js';
const router = express.Router();

router.post("/add", isAuth, addCart);


router.get("/getcart", isAuth, getCart);






router.post("/clear",isAuth,clearCart)
router.get("/search",searchProducts)
router.post("/mock-payment",mockApi)
router.post('/save', isAuth,saveOrder);
router.get('/order', isAuth,getDetails);

  
  // In routes
  router.post('/update-location', isAuth, updateLocation);
  router.get('/get-location', isAuth, getUserLocation);


export default router;
import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { addCart, clearCart, geocode, getCart, getLoaction, getOrders, mockApi, optimizeRoute, placeOrder, reverseGeocode, searchProducts } from '../controllers/customerControllers.js';
const router = express.Router();

router.post("/add", isAuth, addCart);


router.get("/getcart", isAuth, getCart);


router.post("/order", isAuth, placeOrder);

router.get("/getorder",isAuth,getOrders)

router.post("/geocode",geocode)
router.post("/reverse",reverseGeocode)
router.post("/optimize",optimizeRoute)

router.post("/getlocation",getLoaction)
router.post("/clear",isAuth,clearCart)
router.get("/search",searchProducts)
router.post("/mock-payment",mockApi)

export default router;
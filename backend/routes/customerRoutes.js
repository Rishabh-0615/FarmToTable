import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { addCart, geocode, getCart, getLoaction, getOrders, optimizeRoute, placeOrder, reverseGeocode } from '../controllers/customerControllers.js';
const router = express.Router();

router.post("/add", isAuth, addCart);


router.get("/getcart", isAuth, getCart);


router.post("/order", isAuth, placeOrder);

router.get("/getorder",isAuth,getOrders)

router.post("/geocode",isAuth,geocode)
router.post("/reverse",isAuth,reverseGeocode)
router.post("/optimize",isAuth,optimizeRoute)

router.post("/getlocation",isAuth,getLoaction)

export default router;
import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { addCart, getCart, placeOrder } from '../controllers/CustomerControllers.js';
const router = express.Router();

router.post("/add", isAuth, addCart);


router.get("/getcart", isAuth, getCart);


router.post("/order", isAuth, placeOrder);


export default router;
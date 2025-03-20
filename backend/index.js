import  express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import axios from 'axios';
import cors from 'cors';
import Razorpay from 'razorpay';
dotenv.config();
const port=process.env.PORT || 5000;

cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api,
    api_secret: process.env.Cloud_Secret,
  });

const app=express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(express.json());
app.use(cookieParser());

import userRoutes from './routes/userRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import adminRoutes from './routes/adminRoutes.js'


app.use("/api/user",userRoutes);
app.use("/api/user/farmer",farmerRoutes)
app.use("/api/user/customer",customerRoutes)
app.use("/api/admin", adminRoutes)




const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});




const FLASK_API_URL_PRICE = 'http://localhost:5001/predict-price';
const FLASK_API_URL_DEMAND = 'http://localhost:5001/predict-demand';




const validatePredictionInput = (req, res, next) => {
  const requiredFields = ['Vegetable', 'Temperature', 'Rainfall', 'Seasonal Factor', 'Fuel Price'];
  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: `Missing required fields: ${missingFields.join(', ')}`
    });
  }

  
  const numericFields = ['Temperature', 'Rainfall', 'Seasonal Factor', 'Fuel Price'];
  for (const field of numericFields) {
    const value = parseFloat(req.body[field]);
    if (isNaN(value) || value < 0) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid value for ${field}: must be a non-negative number`
      });
    }
    req.body[field] = value; 
  }

  next();
};


app.post('/api/predict-price', validatePredictionInput, async (req, res) => {
  try {
    const response = await axios.post(FLASK_API_URL_PRICE, req.body);
    return res.json(response.data);
  } catch (error) {
    console.error('Error calling Flask API for price prediction:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to get price prediction',
      error: error.response?.data || error.message
    });
  }
});


app.post('/api/predict-demand', validatePredictionInput, async (req, res) => {
  try {
    const response = await axios.post(FLASK_API_URL_DEMAND, req.body);
    return res.json(response.data);
  } catch (error) {
    console.error('Error calling Flask API for demand prediction:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to get demand prediction',
      error: error.response?.data || error.message
    });
  }
});


app.post("/api/predict", async (req, res) => {
  try {
    const response = await axios.post("http://127.0.0.1:5001/predict", {
      text: req.body.text,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error communicating with Flask server" });
  }
});




// Create Razorpay instance once, outside route handlers
 // Make sure this is at the top of your file

const razorpay = new Razorpay({
  key_id: "rzp_test_5GCQM2qPC6xhmN",
  key_secret: "T27TzLofObgZKJAP0Wt5mMGX"
});

// Order creation endpoint
app.post('/orders', async(req, res) => {
  console.log('Received order request:', req.body);
  
  // Validate request body
  if (!req.body.amount) {
    return res.status(400).json({ error: "Amount is required" });
  }
  
  const options = {
    amount: req.body.amount,
    currency: req.body.currency || 'INR',
    receipt: "receipt_" + Date.now(),
    payment_capture: 1
  };
  
  try {
    console.log('Creating Razorpay order with options:', options);
    const response = await razorpay.orders.create(options);
    console.log('Razorpay order created:', response);
    
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Payment details endpoint
app.get("/payment/:paymentId", async(req, res) => {
  const {paymentId} = req.params;
  
  try {
    console.log('Fetching payment details for:', paymentId);
    const payment = await razorpay.payments.fetch(paymentId);
    
    if (!payment){
      return res.status(404).json({ error: "Payment not found" });
    }
    
    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency
    });
  } catch(error) {
    console.error('Payment fetch error:', error);
    res.status(500).json({ error: error.message || "Failed to fetch payment details" });
  }
});








app.listen(port , ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
})



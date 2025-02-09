import  express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import axios from 'axios';
import cors from 'cors';
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
import deliveryRoutes from './routes/deliveryRoutes.js'
import adminRoutes1 from './routes/adminRoutes1.js'

app.use("/api/user",userRoutes);
app.use("/api/user/farmer",farmerRoutes)
app.use("/api/user/customer",customerRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/user/deliveries",deliveryRoutes)
app.use("/api/new",adminRoutes1)




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







app.listen(port , ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
})



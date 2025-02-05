import  express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
dotenv.config();
const port=process.env.PORT || 5000;
cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api,
    api_secret: process.env.Cloud_Secret,
  });

const app=express();


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
app.use("/api", adminRoutes)





// Route for Reverse Geocoding (Coordinates to Address)




// Route for Geolocation (Approximate Device Location using nearby cell towers and WiFi nodes)

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});



app.listen(port , ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
})




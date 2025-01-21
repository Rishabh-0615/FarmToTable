import  express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
dotenv.config();
const port=process.env.PORT || 5000;

const app=express();


app.use(bodyParser.json()); 
app.use(express.json());
app.use(cookieParser());

import userRoutes from './routes/userRoutes.js';

app.use("/api/user",userRoutes);


app.listen(port , ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
})
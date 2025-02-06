import TryCatch from "../utils/TryCatch.js";
import { User } from "../models/userModel.js";
import generateAdminToken from "../middlewares/generateAdminToken.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import validator from 'validator';
dotenv.config();


export const adminLogin = TryCatch(async(req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_UNAME && password === process.env.ADMIN_PASSWD) {

    generateAdminToken(res);

    return res.json({
      message: "Login successful",
    });
  } else {
    return res.status(401).json({ message: "Incorrect username or password." });
  }
});


export const getUnverifiedFarmers = TryCatch(async (req, res) => {
  const unverifiedFarmers = await User.find({ role: "farmer", isVerifiedByAdmin: false }); //find unverified  

  // console.log("Fetching unverified farmers:", unverifiedFarmers); 

  if (!unverifiedFarmers || unverifiedFarmers.length === 0) {
    return res.status(200).json({ farmers: [] });
  }

  res.status(200).json({ farmers: unverifiedFarmers }); 
});


export const verifyFarmer = TryCatch(async (req, res) => {
  console.log("helloadmin");
  try {
    const { userId } = req.params;
    const farmer = await User.findById(userId);

    if (!farmer || farmer.role !== "farmer") {
      return res.status(404).json({ message: "Farmer not found" });
    }

    farmer.isVerifiedByAdmin = true;
    await farmer.save();

    res.status(200).json({ message: "Farmer verified successfully" });
  } catch (error) {
    console.error("Verification error:", error); 
    res.status(500).json({ message: "Server error", error });
  }
});

export const logoutAdmin = TryCatch(async(req,res)=>{
  res.clearCookie("token");
  res.json({
      message:"User Logged out",
  })
})
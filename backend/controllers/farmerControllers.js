import { Product } from "../models/productModel.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from 'cloudinary';
import uploadFile from "../middlewares/multer.js";  // Import the Multer file upload middleware

export const addProduct = TryCatch(async (req, res) => {
  const { name, quantity, weight, price, location, condition, notes } = req.body;
  const file = req.file; // This will be set by Multer middleware

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileUrl = getDataUrl(file);
  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  await Product.create({
    name,
    quantity,
    weight,
    price,
    location,
    condition,
    notes,
    image: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
    owner: req.user._id,
  });

  res.status(201).json({
    message: "Product Added",
  });
});


export const getAllProducts=TryCatch(async(req,res)=>{
    const products=await Product.find().sort({createdAt:-1});
    res.json(products);
});


export const getSingleProduct=TryCatch(async(req,res)=>{
    const product=await Product.findById(req.params.id).populate("owner","-password");
    res.json(product);
});
export const deleteProduct = TryCatch(async (req, res) => {
    const { id } = req.body;
  
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }
  
    const product = await Product.findById(id);
  
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  
    // Delete the product
    await product.deleteOne();
  
    res.status(200).json({
      message: "Product deleted successfully",
    });
  });
  
  
  export const editProduct = TryCatch(async (req, res) => {
    const { id, name, price, quantity } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;

    await product.save();
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Edit Error:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
  });
  


// const {title,pin}=req.body;
//     const file =req.file;
//     const fileUrl =getDataUrl(file)
//     const cloud =await cloudinary.v2.uploader.upload(fileUrl.content);
//     await Pin.create({
//         title,
//         pin,
//         image:{
//             id:cloud.public_id,
//             url:cloud.secure_url,
//         },
//         owner:req.user._id,
//     });

//     res.json({
//         message:"Pin created",
//     })
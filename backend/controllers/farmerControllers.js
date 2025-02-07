import { Product } from "../models/productModel.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from 'cloudinary';
import uploadFile from "../middlewares/multer.js";

export const addProduct = TryCatch(async (req, res) => {
  const { 
    category, 
    name, 
    quantity, 
    weight, 
    price, 
    city, 
    condition, 
    notes,
    life,
    quantityUnit,
    
    // Add new discount fields
    discountOffer,
    minQuantityForDiscount,
    discountPercentage
  } = req.body;

  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileUrl = getDataUrl(file);
  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  // Create product object with conditional discount fields
  const productData = {
    category,
    name,
    quantity,
    weight,
    price,
    city,
    condition,
    notes,
    life,
    quantityUnit,
    image: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
    owner: req.user._id,
  };

  // Only add discount fields if discountOffer is true
  if (discountOffer === 'true') {
    productData.discountOffer = true;
    productData.minQuantityForDiscount = minQuantityForDiscount;
    productData.discountPercentage = discountPercentage;
  }

  const newProduct = await Product.create(productData);

  res.status(201).json({
    message: "Product Added",
    product: newProduct,
  });
});

export const getAllProducts = TryCatch(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).populate('owner', 'name');
  res.json(products);
});

export const getSingleProduct = TryCatch(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("owner", "-password");
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

  await product.deleteOne();

  res.status(200).json({
    message: "Product deleted successfully",
  });
});

export const editProduct = TryCatch(async (req, res) => {
  const { 
    id, 
    name, 
    price, 
    quantity, 
    category,
    discountOffer,
    minQuantityForDiscount,
    discountPercentage,
    
  } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update basic fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.category = category || product.category;

    // Update discount fields
    if (discountOffer !== undefined) {
      product.discountOffer = discountOffer;
      if (discountOffer) {
        product.minQuantityForDiscount = minQuantityForDiscount || product.minQuantityForDiscount;
        product.discountPercentage = discountPercentage || product.discountPercentage;
      } else {
        // If discount offer is disabled, remove the discount fields
        product.minQuantityForDiscount = undefined;
        product.discountPercentage = undefined;
      }
    }

    await product.save();
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Edit Error:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
});
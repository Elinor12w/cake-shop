import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Cake from '../models/Cake.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// 1. Cloudinary SDK Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Multer-Storage-Cloudinary Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cake_factory_images', // The folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'webp', 'jpeg'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }], // Optional: optimize images
  },
});

const upload = multer({ storage: storage });

// 3. GET all cakes
router.get('/', async (req, res) => {
  try {
    const cakes = await Cake.find({});
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// 4. POST - Upload multiple images to Cloudinary and save URLs to MongoDB
router.post('/upload', upload.array('images', 10), async (req, res) => {
  try {
    const { name, flavor, size, category, basePrice, description } = req.body;
    
    // In Cloudinary storage, req.files will contain an array of objects
    // The secure URL is found in file.path
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one image' });
    }

    // Map over req.files to extract the Cloudinary paths (secure URLs)
    const imagePaths = req.files.map(file => file.path);

    const newCake = new Cake({
      name,
      flavor,
      size,
      category,
      basePrice,
      images: imagePaths, // This now stores full https URLs from Cloudinary
      description
    });

    const savedCake = await newCake.save();
    res.status(201).json(savedCake);
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
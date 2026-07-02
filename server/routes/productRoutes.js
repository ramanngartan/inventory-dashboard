
import express from 'express';

import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController.js';

import Product from '../models/Product.js';

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct)

router.patch("/:id", updateProduct)

router.delete("/:id", deleteProduct)

export default router;
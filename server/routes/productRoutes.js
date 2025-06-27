import express from 'express';
import Product from '../models/Product.js';
import { normalizeCategoryString } from '../utils/normalizeCategory.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip  = parseInt(req.query.skip,  10) || 0;
    const { category } = req.query;

    // 1. We take ALL goods (or by user/:id)
    let products = await Product.find();

    // 2. If a category is passed, we filter in-memory
    if (category) {
      const filterCategories = category
        .split(',')
        .map(c => c.trim().toLowerCase());

      products = products.filter(product => {
        if (!product.productCategory) return false;

        const rawCat = product.productCategory.trim().toLowerCase();
        const productCats = normalizeCategoryString(product.productCategory);

        // exact match of the whole phrase or match on any token
        return filterCategories.some(cat =>
          cat === rawCat || productCats.includes(cat)
        );
      });
    }

    // 3. Pagination of an already filtered list
    const paginated = products.slice(skip, skip + limit);

    return res.json({ products: paginated });
  } catch (err) {
    console.error('Error while receiving products:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get all products created by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const products = await Product.find({ authorId: req.params.userId });
    res.json(products); 
  } catch (err) {
    console.error('Error while retrieving user products:', err);
    res.status(500).json({ message: 'Error fetching user products' });
  }
});

// Add new product
router.post('/', async (req, res) => {
  console.log(' POST /products -> request body received:', req.body);

  const {
    productName,
    productBrand,
    productCategory,
    productDescription,
    oldPrice,
    newPrice,
    productRating,
    inStock,
    availableQuantity,
    imageURL,
    secondaryImageURL,
    authorId
  } = req.body;

  // Validation of required fields
  if (!productName || !productBrand || !oldPrice || !newPrice || !authorId) {
    return res.status(400).json({
      message: '❌ Required fields: productName, productBrand, oldPrice, newPrice, authorId',
    });
  }

  try {
    const newProduct = new Product({
      productName,
      productBrand,
      productCategory,
      productDescription,
      oldPrice,
      newPrice,
      productRating,
      inStock,
      availableQuantity,
      imageURL,
      secondaryImageURL,
      authorId,
      createdAt: new Date(), 
    });

    const savedProduct = await newProduct.save();
    console.log(' New product created:', savedProduct._id);
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('❌ Error creating product:', err);
    res.status(500).json({ message: 'Error creating product' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Invalid update request' });
  }
});

// Remove product
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid delete request' });
  }
});

export default router;

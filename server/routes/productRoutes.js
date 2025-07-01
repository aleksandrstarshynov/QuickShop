import express from 'express';
import Product from '../models/Product.js';
import { normalizeCategoryString } from '../utils/normalizeCategory.js';

const router = express.Router();

// Get all products (filtered by slug)
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = parseInt(req.query.skip, 10) || 0;
    const { categories } = req.query;

    console.log('👉 Категории из запроса:', categories);

    let filter = {};

    if (categories) {
      const selectedSlugs = categories
        .split(',')
        .map(slug => slug.trim().toLowerCase());

      filter.productCategorySlug = { $in: selectedSlugs };
    }

    console.log('🧪 Mongo filter:', filter);
    
    const products = await Product.find(filter).skip(skip).limit(limit);
    return res.json({ products });
  } catch (err) {
    console.error('❌ Error while receiving products:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get all products created by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    console.log("🔍 Фильтр:", filter);
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

  // Generation of slug from the first category
  const categoryName = Array.isArray(productCategory)
    ? productCategory[0]
    : productCategory;

  const categorySlug = categoryName
    ? categoryName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    : '';

  try {
    const newProduct = new Product({
      productName,
      productBrand,
      productCategory,
      productCategorySlug: categorySlug, 
      productDescription,
      oldPrice,
      newPrice,
      productRating,
      inStock,
      availableQuantity,
      imageURL,
      secondaryImageURL,
      authorId,
      });

    const savedProduct = await newProduct.save();
    console.log('New product created:', savedProduct._id);
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
      { new: true } // return the updated document
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

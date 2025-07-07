
import express from 'express';
import Product from '../models/Product.js';
import slugify from 'slugify';  

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    
    const rawCategories = await Product.distinct('productCategory');
    
    rawCategories.sort((a, b) => a.localeCompare(b, 'ru', { sensitivity: 'base' }));

    const result = rawCategories.map(name => ({
      name,
      slug: slugify(name, { lower: true, strict: true }),
    }));

    return res.json(result);
  } catch (err) {
    console.error('Error getting categories:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export const categoriesRouter = router;

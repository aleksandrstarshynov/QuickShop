import express from 'express';
import Product from '../models/Product.js'; 

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const raw = await Product.find({});

    const categories = await Product.distinct('productCategory');

    const result = categories.map(cat => ({
      name: cat,
      slug: cat.toLowerCase().replace(/\s+/g, '-'),
    }));

    res.json(result);
  } catch (err) {
    console.error('Error getting categories:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

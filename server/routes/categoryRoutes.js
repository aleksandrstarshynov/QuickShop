import express from 'express';
import Product from '../models/Product.js'; 

const router = express.Router();

// GET /api/categories — получить уникальные категории из поля productCategory
// router.get('/', async (req, res) => {
//   try {
//     const categories = await Product.distinct('productCategory'); 
//     const result = categories.map(cat => ({
//       name: cat,
//       slug: cat.toLowerCase().replace(/\s+/g, '-'),
//     }));
//     res.json(result);
//   } catch (err) {
//     console.error('Ошибка при получении категорий:', err);
//     res.status(500).json({ message: 'Ошибка сервера' });
//   }
// });

router.get('/', async (req, res) => {
  try {
    const raw = await Product.find({});
    console.log('Все товары:', raw);

    const categories = await Product.distinct('productCategory');
    console.log('Категории из distinct:', categories);

    const result = categories.map(cat => ({
      name: cat,
      slug: cat.toLowerCase().replace(/\s+/g, '-'),
    }));

    res.json(result);
  } catch (err) {
    console.error('Ошибка при получении категорий:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;

import express from 'express';
import { Product } from '../models/Product.js';
// import Product from '../models/Product.js';

const router = express.Router();

// Получить все продукты
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;  // сколько товаров вернуть (по умолчанию 20)
    const skip = parseInt(req.query.skip) || 0;     // сколько пропустить (для пагинации)

    const products = await Product.find().limit(limit).skip(skip);
    res.json({ products }); // возвращаем объект с массивом продуктов
  } catch (err) {
    console.error('Ошибка при получении продуктов:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Добавить новый продукт
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating product' });
  }
});

// Получить продукт по ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
});

// Обновить продукт
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // вернуть обновлённый документ
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Invalid update request' });
  }
});

// Удалить продукт
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

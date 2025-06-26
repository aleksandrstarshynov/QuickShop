import express from 'express';
import Product from '../models/Product.js';
// import Product from '../models/Product.js';
import { normalizeCategoryString } from '../utils/normalizeCategory.js';

const router = express.Router();

// Получить все продукты
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip  = parseInt(req.query.skip,  10) || 0;
    const { category } = req.query;

    // 1. Забираем ВСЕ товары (или по user/:id)
    let products = await Product.find();

    // 2. Если передана категория — фильтруем in-memory
    if (category) {
      const filterCategories = category
        .split(',')
        .map(c => c.trim().toLowerCase());

      products = products.filter(product => {
        if (!product.productCategory) return false;

        const rawCat = product.productCategory.trim().toLowerCase();
        const productCats = normalizeCategoryString(product.productCategory);

        // точное совпадение всей фразы или совпадение по любому токену
        return filterCategories.some(cat =>
          cat === rawCat || productCats.includes(cat)
        );
      });
    }

    // 3. Пагинация уже отфильтрованного списка
    const paginated = products.slice(skip, skip + limit);

    return res.json({ products: paginated });
  } catch (err) {
    console.error('Ошибка при получении продуктов:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Получить все продукты, созданные конкретным пользователем
router.get('/user/:userId', async (req, res) => {
  try {
    const products = await Product.find({ authorId: req.params.userId });
    res.json(products); 
  } catch (err) {
    console.error('Ошибка при получении продуктов пользователя:', err);
    res.status(500).json({ message: 'Error fetching user products' });
  }
});

// Добавить новый продукт
router.post('/', async (req, res) => {
  console.log(' POST /products -> получено тело запроса:', req.body);

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

  // Валидация обязательных полей
  if (!productName || !productBrand || !oldPrice || !newPrice || !authorId) {
    return res.status(400).json({
      message: '❌ Обязательные поля: productName, productBrand, oldPrice, newPrice, authorId',
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
      createdAt: new Date(), // можно опустить — выставляется схемой
    });

    const savedProduct = await newProduct.save();
    console.log('✅ Новый продукт создан:', savedProduct._id);
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('❌ Ошибка при создании продукта:', err);
    res.status(500).json({ message: 'Ошибка при создании продукта' });
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

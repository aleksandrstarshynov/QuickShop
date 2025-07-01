import pool from '../utils/db.js'; 
import { ObjectId } from 'mongodb';
import Product from '../models/Product.js'; 
import mongoose from 'mongoose';


// Add product to cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body; 
  console.log('Incoming request:', req.body);

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: 'Missing userId, productId or quantity' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO cart_items (user_id, product_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_id) DO UPDATE
       SET quantity = cart_items.quantity + $3
       RETURNING *`,
      [userId, productId, quantity]
    );

    console.log('DB response:', result.rows[0]); 
    res.status(201).json({ message: 'Item added to cart', item: result.rows[0] });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  const userId = req.params.userId;

  try {
    // We get the product_id and quantity array from Postgres
    const pgResult = await pool.query(
      'SELECT product_id, quantity FROM cart_items WHERE user_id = $1',
      [userId]
    );

    // Convert product_id to ObjectId for MongoDB search
    const productIds = pgResult.rows.map(row => new mongoose.Types.ObjectId(row.product_id));

    const products = await Product.find({ _id: { $in: productIds } }).exec();

    // Connecting data from Postgres (quantity) and Mongo (product info)
    const cart = pgResult.rows.map(row => {
      const product = products.find(p => p._id.toString() === row.product_id.toString());
      return {
        product,
        quantity: row.quantity,
      };
    });

    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error.stack);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change quantity of product
export const updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity == null) {
    return res.status(400).json({ message: 'Missing userId, productId or quantity' });
  }

  try {
    if (quantity === 0) {
      // Removing the item from the cart
      await pool.query(
        `DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2`,
        [userId, productId]
      );
      return res.json({ message: 'Cart item deleted' });
    }

    if (quantity < 0) {
      return res.status(400).json({ message: 'Quantity must be zero or greater' });
    }

    const result = await pool.query(
      `INSERT INTO cart_items (user_id, product_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_id)
       DO UPDATE SET quantity = EXCLUDED.quantity
       RETURNING *`,
      [userId, productId, quantity]
    );

    res.json({ message: 'Cart item added/updated', item: result.rows[0] });
  } catch (error) {
    console.error('Error upserting cart item:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove item from cart
export const deleteCartItem = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM cart_items
       WHERE user_id = $1 AND product_id = $2`,
      [userId, productId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

import pool from './db.js';

const createTables = async () => {
  try {
    // Таблица пользователей
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        dateofbirth DATE NOT NULL,
        email VARCHAR(100) UNIQUE,
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Таблица users создана');

    // Таблица корзины
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1
      );
    `);
    console.log('✅ Таблица cart_items создана');

  } catch (err) {
    console.error('❌ Ошибка при создании таблиц:', err);
  } finally {
    pool.end(); // закрыть соединение
  }
};

createTables();

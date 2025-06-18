
import pool from '../utils/db.js';

// const createTables = async () => {
//   try {
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         username VARCHAR(50) NOT NULL UNIQUE,
//         password VARCHAR(100) NOT NULL,
//         firstname VARCHAR(100) NOT NULL,
//         lastname VARCHAR(100) NOT NULL,
//         dateofbirth DATE NOT NULL,
//         email VARCHAR(100) NOT NULL UNIQUE,
//         phone VARCHAR(20) NOT NULL,
//         created_at TIMESTAMP DEFAULT NOW()
//       );
//     `);

//         // Таблица корзины
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS cart_items (
//         id SERIAL PRIMARY KEY,
//         user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//         product_id TEXT NOT NULL,
//         quantity INTEGER NOT NULL DEFAULT 1,
//         added_at TIMESTAMP DEFAULT NOW(),
//         UNIQUE(user_id, product_id)
//       );
//     `);

    
//     console.log(' Таблица users создана');
//   } catch (err) {
//     console.error(' Ошибка при создании таблиц:', err);
//   } finally {
//     await pool.end();
//   }
// };

// createTables();

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        dateofbirth DATE NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

await pool.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_id VARCHAR(24) NOT NULL, 
        quantity INTEGER NOT NULL DEFAULT 1,
        added_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, product_id)
      );
    `);


    console.log('✅ Таблицы успешно созданы!');
  } catch (err) {
    console.error('❌ Ошибка при создании таблиц:', err.stack);
  }
};

// Вызов функции
createTables();

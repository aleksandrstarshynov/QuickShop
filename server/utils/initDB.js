import pool from './db.js';

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
        email VARCHAR(100) UNIQUE,
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW()
        );
    `);

    console.log('✅ Таблица users создана');
  } catch (err) {
    console.error('❌ Ошибка при создании таблиц users:', err);
  } finally {
    pool.end(); // закрыть соединение
  }
};

createTables();
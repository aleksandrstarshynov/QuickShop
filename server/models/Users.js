// import mongoose from 'mongoose';
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   firstname: { type: String, required: true },
//   lastname: { type: String, required: true },
//   dateofbirth: { type: Date, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true }
// });
// export const User = mongoose.model('User', userSchema);

import pool from '../utils/db.js';

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

    console.log(' Таблица users создана');
  } catch (err) {
    console.error(' Ошибка при создании таблиц:', err);
  } finally {
    await pool.end();
  }
};

createTables();
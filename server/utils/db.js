import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); 

const { Pool } = pg;

console.log('→ Connecting to Postgres with config:', {
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  ssl:      process.env.DB_SSL,
});

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl:      process.env.DB_SSL === 'true'
              ? { rejectUnauthorized: false }
              : false,
});

export default pool;

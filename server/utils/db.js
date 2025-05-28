import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: 'star',
  host: 'localhost',
  database: 'users',
  password: 'stappassword',
  port: 5432,
});

export default pool;
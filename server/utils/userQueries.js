import pool from './db.js';

// ADD user
const insertUser = async (user) => {
  const { username, password, firstname, lastname, dateofbirth, email, phone } = user;
  const result = await pool.query(`
    INSERT INTO users (username, password, firstname, lastname, dateofbirth, email, phone)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `, [username, password, firstname, lastname, dateofbirth, email, phone]);

  return result.rows[0];
};

//SELECT ALL USERS
const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users ORDER BY id ASC;');
  return result.rows;
};

//GET USER
const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1;', [id]);
  return result.rows[0];
};

//UPDATE USER
const updateUser = async (id, updates) => {
  const { username, password, firstname, lastname, dateofbirth, email, phone } = updates;

  const result = await pool.query(`
    UPDATE users
    SET username = $1,
        password = $2,
        firstname = $3,
        lastname = $4,
        dateofbirth = $5,
        email = $6,
        phone = $7
    WHERE id = $8
    RETURNING *;
  `, [username, password, firstname, lastname, dateofbirth, email, phone, id]);

  return result.rows[0];
};

//DELETE USER
const deleteUser = async (id) => {
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *;', [id]);
  return result.rows[0];
};

export {
  insertUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
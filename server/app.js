import express from 'express';
import cors from 'cors';
import { database } from './users.js';
import bcrypt from 'bcrypt';
import { getDecodedUser } from './utils/getDecodedUser.js'; 
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config(); // Загружаем переменные окружения

const saltRounds = 12;
const SECRET = process.env.JWT_SECRET; 
const app = express();

// Настроить CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Регистрируем пользователя
app.post("/auth/register", async (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password
  };

  if (!newUser.username || !newUser.password) {
    return res.status(400).json({ message: "Invalid user" });
  }

  const userExists = database.getByUsername(newUser.username);
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  try {
    newUser.password = await bcrypt.hash(newUser.password, saltRounds);
    const createdUser = database.create(newUser);
    res.status(201).json({ id: createdUser.id, username: createdUser.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Логин пользователя
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const findUser = database.getByUsername(username);
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const correctPassword = await bcrypt.compare(password, findUser.password);
    if (!correctPassword) {
      return res.status(401).json({ message: "Invalid username/password" });
    }
    const user = { name: username, id: findUser.id };
    const token = jsonwebtoken.sign(user, SECRET);

    return res.status(201).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Профиль пользователя
app.get('/auth/profile', async (req, res) => {
  try {
    const decodedUser = getDecodedUser(req, SECRET);

    if (!decodedUser || !decodedUser.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = database.getById(decodedUser.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const message = `Hello, you are logged in as ${user.username}!`;
    res.status(200).json({ message });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

// Обновить пользователя
app.put('/auth/update', async (req, res) => {
  const { username, password } = req.body;

  try {
    const decodedUser = getDecodedUser(req, SECRET);

    if (!decodedUser || !decodedUser.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = database.getById(decodedUser.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) {
      user.username = username;
    }

    if (password) {
      user.password = await bcrypt.hash(password, saltRounds);
    }

    database.update(user);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Логаут
app.post('/auth/logout', async (req, res) => {
  try {
    req.headers['authorization'] = ''; 
    res.status(200).json({ message: "User logged out" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Удалить пользователя
app.delete('/auth/delete', async (req, res) => {
  try {
    const decodedUser = getDecodedUser(req, SECRET);

    if (!decodedUser || !decodedUser.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = database.getById(decodedUser.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    database.delete(user.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error("Error deleting user:", err);  // <-- вот сюда
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Статическая папка для фронтенда
app.use(express.static('client'));

// Запуск сервера
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

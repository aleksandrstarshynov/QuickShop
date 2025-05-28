import express from 'express';
import cors from 'cors';
// import { database } from './users.js';
import { User } from './models/Users.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { getDecodedUser } from './utils/getDecodedUser.js'; 
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config(); 

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
  const { username, password, firstname, lastname, email, phone, dateofbirth } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Invalid user" });
  }

    if (!username || !password || !firstname || !lastname || !email || !phone || !dateofbirth) {
      return res.status(400).json({ error: 'All fields are required' });
    }


  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Создание пользователя
  const newUser = new User({
    username,
    password: hashedPassword,
    firstname,
    lastname,
    email,
    phone,
    dateofbirth
  });

  // Сохранение в базе
  await newUser.save();

  res.status(201).json({ message: 'User created successfully' });

} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
}
});


// Логин пользователя
app.post('/auth/login', async (req, res) => {
  const { username, password, firstname, lastname, email, phone, dateofbirth } = req.body;

  try {
    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const correctPassword = await bcrypt.compare(password, findUser.password);
    if (!correctPassword) {
      return res.status(401).json({ message: "Invalid username/password" });
    }

    const user = { name: username, id: findUser._id };
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

    const user = await User.findById(decodedUser.id);
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

    const user = await User.findById(decodedUser.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) {
      user.username = username;
    }

    if (password) {
      user.password = await bcrypt.hash(password, saltRounds);
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Логаут (токен просто удаляется на клиенте)
app.post('/auth/logout', (req, res) => {
  res.status(200).json({ message: "User logged out" });
});


// Удалить пользователя
app.delete('/auth/delete', async (req, res) => {
  try {
    const decodedUser = getDecodedUser(req, SECRET);

    if (!decodedUser || !decodedUser.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const deleted = await User.findByIdAndDelete(decodedUser.id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Статическая папка для фронтенда
app.use(express.static('client'));


// MongoDB и запуск сервера
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Подключено к MongoDB Atlas!');
    app.listen(4000, () => {
      console.log('🚀 Сервер запущен на порту 4000');
    });
  })
  .catch(err => {
    console.error('❌ Ошибка подключения к MongoDB:', err);
  });
import express from 'express';
import cors from 'cors';
// import { User } from './models/Users.js';
import mongoose from 'mongoose'; 
import bcrypt from 'bcrypt';
import { getDecodedUser } from './utils/getDecodedUser.js'; 
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
import {
  insertUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
} from './utils/userQueries.js'; 
import productRoutes from './routes/productRoutes.js';

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

// РЕГИСТРАЦИЯ
app.post("/auth/register", async (req, res) => {
  const { username, password, firstname, lastname, email, phone, dateofbirth } = req.body;

  if (!username || !password || !firstname || !lastname || !email || !phone || !dateofbirth) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const users = await getAllUsers();
    const userExists = users.find(u => u.username === username);
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await insertUser({
      username,
      password: hashedPassword,
      firstname,
      lastname,
      email,
      phone,
      dateofbirth
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
} catch (error) {
  console.error("Registration error:", error);
  res.status(500).json({ error: error.message }); 
}
});

// ЛОГИН
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const users = await getAllUsers();
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ message: "Invalid username/password" });
    }

    const token = jsonwebtoken.sign({ id: user.id, name: user.username }, SECRET);
    res.status(201).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ПРОФИЛЬ
app.get('/auth/profile', async (req, res) => {
  try {
    const decodedUser = getDecodedUser(req, SECRET);
    if (!decodedUser || !decodedUser.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await getUserById(decodedUser.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: `Hello, ${user.username}` });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

// ОБНОВЛЕНИЕ
app.put('/auth/update', async (req, res) => {
  const { username, password, firstname, lastname, email, phone, dateofbirth } = req.body;

  try {
    const decodedUser = getDecodedUser(req, SECRET);
    if (!decodedUser || !decodedUser.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const updates = {
      username,
      password: password ? await bcrypt.hash(password, saltRounds) : undefined,
      firstname,
      lastname,
      email,
      phone,
      dateofbirth
    };

    const updatedUser = await updateUser(decodedUser.id, updates);
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// УДАЛЕНИЕ
app.delete('/auth/delete', async (req, res) => {
  try {
    const decodedUser = getDecodedUser(req, SECRET);
    if (!decodedUser || !decodedUser.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    await deleteUser(decodedUser.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Логаут (токен просто удаляется на клиенте)
app.post('/auth/logout', (req, res) => {
  res.status(200).json({ message: "User logged out" });
});


// PRODUCTS
 app.use('/products', productRoutes);
// mongoose.connect(process.env.MONGODB_URI, {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));



// Статическая папка для фронтенда
app.use(express.static('my-app'));


// Запуск сервера
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');

    app.listen(4000, () => {
      console.log('🚀 Сервер запущен на порту 4000');
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
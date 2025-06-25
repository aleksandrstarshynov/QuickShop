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
import cartRoutes from './routes/cartRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config(); 

const saltRounds = 12;
const SECRET = process.env.JWT_SECRET; 
const app = express();

// middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Настроить CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

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

    console.log('Введённое имя:', username);
    console.log('Введённый пароль:', password);
    console.log('Найден пользователь:', user);
    console.log('Хэш из базы:', user.password);
    console.log('Перед сравнением пароля');
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ message: "Invalid username/password" });
    }

    console.log('Пароль совпадает?', correctPassword);

    const token = jsonwebtoken.sign({ id: user.id, name: user.username }, SECRET);
    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        dateofbirth: user.dateofbirth,
        created_at: user.created_at,
      }
    });
    console.log('Токен создан:', token);
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

    res.status(200).json(user);
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

// CART
app.use('/api', cartRoutes);

// CATEGORIES
app.use('/api/categories', categoryRoutes);

// Статическая папка для фронтенда
app.use(express.static('my-app'));

//STRIP
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Создать Checkout Session

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Товар №1' },
          unit_amount: 5000, // 50.00 USD в центах
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// get Checkout Session
app.get('/checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.sessionId);
  res.json(session);
});

// роут для создания PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { items } = req.body;

    // Считаем общую сумму в центах только один раз
    const amount = items.reduce((sum, item) => {
      const price = item.product?.newPrice;
      return sum + (price ? price * item.quantity * 100 : 0);
    }, 0);

    if (amount <= 0) {
      return res.status(400).json({ error: 'Invalid cart total' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Error creating PaymentIntent:', err);
    return res.status(500).json({ error: err.message });
  }
});


// const PORT = process.env.PORT || 4242;
// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// Запуск сервера
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 45000,        
})
  .then(() => {
    console.log('MongoDB connected');

    app.listen(4000, () => {
      console.log('🚀 Сервер запущен на порту 4000');
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

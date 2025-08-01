import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; 
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import jsonwebtoken from 'jsonwebtoken';

import { getDecodedUser } from './utils/getDecodedUser.js'; 
import {
  insertUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
} from './utils/userQueries.js'; 
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import { categoriesRouter } from './routes/categoryRoutes.js';
import orderEmailRoute from './routes/orderEmail.js';
import sendWelcomeEmail from './utils/sendWelcomeEmail.js';
import Stripe from 'stripe';

dotenv.config(); 

const saltRounds = 12;
const SECRET = process.env.JWT_SECRET; 
const app = express();

// CORS
const allowed = [
  'http://localhost:3000',
  'http://51.20.55.140'
];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) cb(null, true);
    else cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());

// Logging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// MongoDB Comment Schema

const commentSchema = new mongoose.Schema({
  productId: String,
  username: String,
  text: String,
  timestamp: { type: Date, default: Date.now }
});
const Comment = mongoose.model('Comment', commentSchema);

// Auth routes


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

    await sendWelcomeEmail({ email, firstname });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message }); 
  }
});

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const users = await getAllUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: "User not found" });

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) return res.status(401).json({ message: "Invalid username/password" });

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
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/auth/profile', async (req, res) => {
  try {
    const decodedUser = getDecodedUser(req, SECRET);
    if (!decodedUser || !decodedUser.id) return res.status(401).json({ message: 'Invalid token' });

    const user = await getUserById(decodedUser.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

app.put('/auth/update', async (req, res) => {
  try {
    const decoded = getDecodedUser(req, SECRET);
    if (!decoded?.id) return res.status(401).json({ message: 'Invalid token' });

    const existing = await getUserById(decoded.id);
    if (!existing) return res.status(404).json({ message: 'User not found' });

    const {
      username,
      password,
      firstname,
      lastname,
      email,
      phone,
      dateofbirth
    } = req.body;

    const merged = {
      username:    username    || existing.username,
      password:    password
                    ? await bcrypt.hash(password, saltRounds)
                    : existing.password,
      firstname:   firstname   ?? existing.firstname,
      lastname:    lastname    ?? existing.lastname,
      email:       email       ?? existing.email,
      phone:       phone       ?? existing.phone,
      dateofbirth: dateofbirth ?? existing.dateofbirth
    };

    const updated = await updateUser(decoded.id, merged);
    return res.json({ message: 'User updated', user: updated });

  } catch (err) {
    console.error('Update error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/auth/delete', async (req, res) => {
  try {
    const decodedUser = getDecodedUser(req, SECRET);
    if (!decodedUser || !decodedUser.id) return res.status(401).json({ message: 'Invalid token' });

    await deleteUser(decodedUser.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/auth/logout', (req, res) => {
  res.status(200).json({ message: "User logged out" });
});

// Other routes
app.use('/products', productRoutes);
app.use('/api', cartRoutes);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders/email', orderEmailRoute);
app.use(express.static('my-app'));

// Stripe routes
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Товар №1' },
          unit_amount: 5000,
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

app.get('/checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.sessionId);
  res.json(session);
});

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { items, email, name } = req.body;

    const amount = items.reduce((sum, item) => {
      const price = parseFloat(item.price);
      return isNaN(price) || price <= 0
        ? sum
        : sum + price * item.quantity * 100;
    }, 0);

    if (amount <= 0) {
      return res.status(400).json({ error: 'Invalid cart total' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      receipt_email: email,
      shipping: {
        name: name || 'Fake Name',
        address: {
          line1: '123 Main St',
          city: 'Unknown',
          country: 'US',
          postal_code: '00000',
        },
      },
      metadata: { integration_check: 'accept_a_payment' },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Error creating PaymentIntent:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Socket.IO

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowed,
    credentials: true,
  }
});

io.on('connection', (socket) => {
  console.log('🔌 Client connected');

  socket.on('joinProduct', async (productId) => {
    socket.join(productId);
    const comments = await Comment.find({ productId }).sort({ timestamp: 1 }).lean();
    socket.emit('initialComments', comments);
  });

  socket.on('newComment', async ({ productId, userId, username, text }) => {
    const comment = await Comment.create({ productId, userId, username, text });
    io.to(productId).emit('newComment', comment);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


// MongoDB + Start server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 45000,        
})
  .then(() => {
    console.log('✅ MongoDB connected');

    server.listen(4000, () => {
      console.log('🚀 The server is running on port 4000');
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

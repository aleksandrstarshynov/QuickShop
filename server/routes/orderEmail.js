import express from 'express';
import sendOrderEmail from '../utils/sendOrderEmail.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { customerEmail, customerName, items, totalAmount } = req.body;

    if (!customerEmail || !items || !totalAmount) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    await sendOrderEmail({ customerEmail, customerName, items, totalAmount });
    res.json({ message: 'Email sent successfully.' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

export default router;

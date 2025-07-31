import express from 'express';
import sendConfirmationEmail from '../utils/sendConfirmationEmail.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, name, confirmationLink } = req.body;

  if (!email || !confirmationLink) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await sendConfirmationEmail({ to: email, name, confirmationLink });
    res.json({ message: 'Confirmation email sent' });
  } catch (err) {
    console.error('Error sending confirmation email:', err);
    res.status(500).json({ error: 'Email sending failed' });
  }
});

export default router;

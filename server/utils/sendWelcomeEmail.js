import nodemailer from 'nodemailer';

const sendWelcomeEmail = async ({ email, firstname }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
    <h2 style="color: #333;">Welcome, ${firstname}!</h2>
    <p>Thank you for registering with our store 🎉</p>
    <p>If you have any questions, just reply to this email.</p>
    <p style="margin-top: 30px; font-size: 13px; color: #aaa;">&copy; ${new Date().getFullYear()} My Store</p>
  </div>
`;

  await transporter.sendMail({
    from: `"My Store" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to the Quickshop Store!',
    html,
  });
};

export default sendWelcomeEmail;

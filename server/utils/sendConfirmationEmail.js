import nodemailer from 'nodemailer';

const sendConfirmationEmail = async ({ email, name, confirmationLink }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea;">
      <h2 style="text-align: center; color: #333;">Welcome to My Store!</h2>
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for registering at <strong>My Store</strong>.</p>
      <p>To complete your registration, please confirm your email address by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${confirmationLink}" style="background-color: #6a1b9a; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 4px;">Confirm Email</a>
      </div>
      <p>If you didn't create an account, you can safely ignore this email.</p>
      <p style="margin-top: 30px; font-size: 13px; color: #aaa; text-align: center;">&copy; ${new Date().getFullYear()} My Store. All rights reserved.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"My Store" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Confirm your email',
    html,
  });
};

export default sendConfirmationEmail;

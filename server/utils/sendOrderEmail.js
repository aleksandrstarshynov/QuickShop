import nodemailer from 'nodemailer';

const sendOrderEmail = async ({ customerEmail, customerName, items, totalAmount }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea;">
      <h2 style="text-align: center; color: #333;">Thank you for your order!</h2>
      <p><strong>Name:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <h3 style="margin-top: 30px; color: #333;">Order Summary:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="text-align: left; border-bottom: 2px solid #ccc; padding: 8px;">Product</th>
            <th style="text-align: center; border-bottom: 2px solid #ccc; padding: 8px;">Quantity</th>
            <th style="text-align: right; border-bottom: 2px solid #ccc; padding: 8px;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
              <td style="padding: 8px; text-align: center; border-bottom: 1px solid #eee;">${item.quantity}</td>
              <td style="padding: 8px; text-align: right; border-bottom: 1px solid #eee;">€${item.price}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p style="text-align: right; font-size: 16px; margin-top: 20px;">
        <strong>Total: €${totalAmount}</strong>
      </p>
      <p style="margin-top: 30px; font-size: 14px; color: #666;">
        If you have any questions, just reply to this email.
      </p>
      <p style="font-size: 13px; color: #aaa; text-align: center; margin-top: 40px;">
        &copy; ${new Date().getFullYear()} My Store. All rights reserved.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"My Store" <${process.env.EMAIL_USER}>`,
    to: customerEmail,
    subject: 'Your order confirmation',
    html,
  });
};

export default sendOrderEmail;

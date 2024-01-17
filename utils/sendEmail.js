import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async ({ from, to, bcc, subject, text = '', html = '' }) => {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      bcc,
      subject,
      text,
      html,
    });
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw new Error('Failed to send email');
  }
};

export default sendEmail;

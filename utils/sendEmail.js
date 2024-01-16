import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.FORWARDEMAIL_EMAIL,
    pass: process.env.FORWARDEMAIL_PASSWORD,
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

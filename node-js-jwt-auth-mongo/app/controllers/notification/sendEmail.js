require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = ({ email, subject, text }) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_NAME, 
      pass: process.env.EMAIL_PASSWORD
    }
  });
  let mailOptions = {
    from: process.env.EMAIL_NAME,
    to: email,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(`Помилка: ${err}`);
      return { status: 500, error: 'Помилка' };
    }
    console.log('Лист надіслано!!!');
    return { status: 200, message: 'Лист надіслано!!!' };
  });
};

module.exports = sendEmail;
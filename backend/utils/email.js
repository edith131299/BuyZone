const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transport = {
    host: process.env.SMTP_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASS,
    },
  };

  const transporter = nodeMailer.createTransport(transport);
  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMPT_FROM_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;

const nodemailer = require("nodemailer");

const catchAsyncError = require("express-async-handler");

exports.sendEmail = catchAsyncError(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 535,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.MAILID,
      pass: process.env.MP,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "modernEcommerce@gmail.com", // sender address
    to: data.email, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.htm, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
});

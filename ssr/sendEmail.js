const nodemailer = require("nodemailer");

const smtpTrans = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "danieldeveloped",
    pass: process.env.emailKey,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

//Specify what the email will look like
const mailOptions = {
  from: "danieldeveloped@gmail.com",
  // to: 'popa.daniel19@gmail.com',
  subject: "sample subject",
  text: "sample text",
  html: `
    //todo link with key for new password
	`,
};

smtpTrans.sendMail(mailOptions, (err, res) => {
  if (err) {
    return console.log(err);
  } else {
    console.log(JSON.stringify(res));
  }
});

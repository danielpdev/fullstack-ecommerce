const nodemailer = require('nodemailer');
import { getMailOptions } from './mail-options';

export function initMail(email, passResetKey) {
  
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'danieldeveloped',
      pass: 'z8wvE92pMZkBjs7'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  async function sendMail(): Promise<boolean> {
    return await new Promise<boolean>((resolve) => {
      transporter.sendMail(getMailOptions(email, passResetKey), function(error, info){
        if (error) {
           resolve(false); 
        } else {
            resolve(true);
        }
       });
    })
  }
  
  return sendMail;
}

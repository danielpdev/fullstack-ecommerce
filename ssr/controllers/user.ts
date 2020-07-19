const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const shortId = require('shortid');
import { initMail } from '../mailer/transporter';

require('dotenv').config()

import User from '../models/user';

export const createUser = async (req, res, next) => {
  if (!(req.body && req.body.email && req.body.password)) {
    return res.status(401).json({
      message: "Invalid signup credentials!"
    });
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    email: req.body.email,
    password: hashPassword
  });
  try {
    await user.save();
    return res.status(201).json({
      message: "User created!",
    });
  } catch {
    return res.status(500).json({
      message: "Invalid authentication credentials!"
    });
  }
}

export const userLogin = async (req, res, next) => {
  let fetchedUser;

  if (!(req.body && req.body.email && req.body.password)) {
    return res.status(401).json({
      message: "Invalid authentication credentials!"
    });
  }

  try {
    fetchedUser = await User.findOne({ email: req.body.email });
    const samePassword = bcrypt.compare(req.body.password, fetchedUser.password);
    if (!samePassword) {
      throw { samePassword };
    }
    const token = jwt.sign(
      {
        email: fetchedUser.email,
        userId: fetchedUser._id,
        role: fetchedUser.role
      },
      process.env.JWT_KEY || 'secret',
      {
        expiresIn: "1h"
      }
    );
    return res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  } catch {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
}

export const resetPassword = async (req, res, next) => {
  let { resetKey, password } = req.body;

  if (!(req.body && req.body.resetKey && req.body.password)) {
    return res.status(401).json({
      message: "Invalid!"
    });
  }

  const userData = await User.findOne({ passwordResetKey: resetKey });
  if (userData) {
    let now = new Date().getTime();
    let keyExpiration = userData.passwordKeyExpires;
    if (keyExpiration > now) {
      userData.password = await bcrypt.hash(password, 10);
      userData.passwordResetKey = null;
      userData.passwordKeyExpires = null;
      try {
        await userData.save();
        return res.status(200).send({
          message: 'Password reset successful'
        });

      } catch {
        return res.status(400).send({
          message: "Failed to reset pass"
        });
      }

    } else {
      return res.status(400).send({
        message: 'Sorry, pass key has expired. Please initiate the request for a new one'
      });
    }
  }
  return res.status(400).send({
    message: 'Wrong passkey'
  });
}

export const forgotPassword = async (req, res, next) => {
  let { email } = req.body;
  const userData = await User.findOne({ email });
  if (!userData) {
    return res.status(400).send('email is incorrect');
  }
  userData.passwordResetKey = shortId.generate();
  userData.passwordKeyExpires = new Date().getTime() + 120 * 60 * 2000;
  try {
    const userSaved = await userData.save();
    if (userSaved) {
      const mailer = initMail(email, userData.passwordResetKey);
      const isEmailSent = await mailer();
      if (!isEmailSent) {
        return res.status(500).send({
          message: "could not send reset code"
        });
      } else {
        return res.status(200).send({
          message: "Reset Code sent"
        });
      }
    }
  } catch {
    return res.status(500).send({
      message: "could not send reset code"
    });
  }

  return res.status(500).send({
    message: "could not send reset code"
  });
};
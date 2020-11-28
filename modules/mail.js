'use strict';

const logger = require('./logger');
const nodemailer = require('nodemailer');
require('dotenv').config()

// get the email and password of the account to send from from the .env
const useremail = process.env.useremail;
const userpassword = process.env.userpassword;

// the options
var mailOptions = {
  from: useremail,
  to: '',
  subject: 'Secret Santa',
  html: ''
};

var sendTheMail = (opts, transporter) => {
  var saveOpts = Object.assign(mailOptions, opts);
  transporter.sendMail(saveOpts, (error, info) => {
    if (error) {
      logger.error(error);
      setTimeout(() => {
        sendTheMail(saveOpts, transporter);
      }, 3000);
    } else {
      logger.info('Message sent: ');
      logger.info(info);
    }
  });
};

const mail = () => {
  return (santasArray) => {
    return new Promise((resolve) => {
      // Using gmail
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: useremail,
          pass: userpassword
        }
      });
      var sendingAddresses = santasArray.map((letter) => {
        var objectToProcess = { to: letter.giver, html: letter.string };
        sendTheMail(objectToProcess, transporter);
        return objectToProcess;
      });
      resolve(sendingAddresses);
    });
  };
};

module.exports = mail;

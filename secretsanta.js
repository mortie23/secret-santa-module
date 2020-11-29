'use strict';

const santaModule = require('./index');
const path = require('path');
const fs = require('fs');
require('dotenv').config()

// get the email and password of the account to send from from the .env
var secretsantaname = process.env.secretsantaname;

var list = fs.readFileSync(path.resolve('./email-list.csv')).toString();

santaModule(list, {
  debug: true,
  template: `<div><h2>It's the ${secretsantaname} Secret Santa!</h2><div>You should prepare for <h3>{%=o.to%}</h3></div></div>`
}).then(console.log);

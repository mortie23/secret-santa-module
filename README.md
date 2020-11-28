# Secret Santa Module

This uses the Gmail service in nodemailer.  
Sign up for a Gmail address for your Secret Santa Admin.  
You must then allow in Gamil settings for [Less secure apps & your Google Account](https://support.google.com/accounts/answer/6010255?hl=en)

## Installation

```
git clone
npm install
```

### Configure your environment variables

```ini
useremail=adminemail@gmail.com
userpassword=qwerty
secretsantaname=Name
```

## Usage

### Debug mode by default 

By default the both scripts `confirmemail.js` and `secretsanta.js` scripts have `debug: true`. Suggest you run it in this mode first. In this mode no emails are sent, only results logged to console.    

```js
// Example
santaModule(list, {
  debug: true,
  template: `<div><h2>It's the ${secretsantaname} Secret Santa!</h2><div>You should prepeare for <h3>{%=o.to%}</h3></div></div>`
}).then(console.log);
```

When you are happy, turn this flag to false.

```sh
# Run this first if you want to confirm that the emails are reaching people
npm run confirmemail
# Then run this to send them out
npm run secretsanta
```

## List Example

This program will not allow partners to have each other in the Secret Santa.

```csv
Name,e-mail,partner
Brad Pitt,brad.pitt@email.com,angelina.jolie@email.com
Angelina Jolie,angelina.jolie@email.com,brad.pitt@email.com
Justin Beiber,justin.beiber@email.com,hailey.bieber@email.com
Hailey Bieber,hailey.bieber@email.com,justin.beiber@email.com
Jake Gyllenhaal,jake.gyllenhaal@email.com
```
## confirmemail Sent message

It's the XYZ Secret Santa!  
Please reply to confirm your email

## secretsanta Sent message

It's the XYZ Secret Santa!  
You should prepare a present for: Brad Pitt (brad.pitt@email.com)

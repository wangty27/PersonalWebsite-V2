const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const notifyPass = require(path.join(__dirname, 'secret', 'PASSWORD.js'));

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'tianyu.ninja.notify@gmail.com',
        pass: notifyPass
    }
});

var app = express();

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'assets')));
app.use(favicon(path.join(__dirname, 'assets', 'pic', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/contact', (req, res) => {
  console.log(req.body);
  const mailOptions = {
    from: 'tianyu.ninja.notify@email.com',
    to: 'terrywang@tianyu.ninja',
    subject: 'New Message From Website',
    html: `<h4>Name: ${req.body.name}<h4>
           <h4>Email: ${req.body.email}</h4>
           <h4>Message: ${req.body.msg}</h4>`
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      res.send(JSON.stringify({ success: false }));
    } else {
      res.send(JSON.stringify({ success: true }));
    }
  });
})

app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('404');
});

app.listen(8080);
console.log('Listening on port 8080');

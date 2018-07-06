const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const favicon = require('serve-favicon');
const path = require('path');

var app = express();

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'assets')));
app.use(favicon(path.join(__dirname, 'assets', 'pic', 'favicon.ico')));

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/Resume-Terry', (req, res) => {
  fs.readFile(path.join(__dirname, 'assets', 'Resume - Terry Wang 2018.pdf'), (err, data) => {
    res.contentType('application/pdf');
    res.send(data);
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

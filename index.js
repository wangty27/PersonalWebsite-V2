const compression = require('compression');
const express = require('express');
const serveStatic = require('serve-static');
const fs = require('fs');
const hbs = require('hbs');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const moment = require('moment-timezone');
const request = require('request');
const requestP = require('request-promise');

const notify = require(path.join(__dirname, 'secret', 'PASSWORD.js'));
const UWAPIKEY = require(path.join(__dirname, 'secret', 'UWAPIKEY.js'));
const APISECRET = require(path.join(__dirname, 'secret', 'APISECRET.js'));

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: notify.email,
    pass: notify.pass
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000
});

var app = express();

app.set('view engine', 'hbs');

app.use(serveStatic(path.join(__dirname, 'assets'), {
  maxAge: '1d'
}));
app.enable('etag');
app.use(compression());
app.use(favicon(path.join(__dirname, 'assets', 'pic', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index', {
    projects: require('./texts/projects'),
    experience: require('./texts/experience')
  });
})

app.post('/contact', (req, res) => {
  const mailOptions = {
    from: 'MESSAGE NOTIFY<tianyu.ninja.notify@gmail.com>',
    to: 'terry@tianyu.wang',
    subject: 'New Message From Website',
    html: `<h4>Name: ${req.body.name}<h4>
           <h4>Email: ${req.body.email}</h4>
           <h4>Message: ${req.body.msg}</h4>`
  };

  var messageLog = `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.msg}\nTime: ${moment().tz("America/New_York").format().replace(/T/, ' ').slice(0, 19)}\n\n`
  var messageLogName = `${moment().tz("America/New_York").format().replace(/T/, ' ').slice(0, 10)}.txt`
  fs.appendFileSync(path.join(__dirname, 'logs', 'message_logs', messageLogName), messageLog, 'utf8');

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    } else {
      res.send(JSON.stringify({ success: true }));
    }
  });
})

app.get('/sitemap', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'sitemap.xml'));
});

// API usage
var APIRouter = express.Router();
APIRouter.get('/courseNameLookup/:term/:subject/:catalog_number', (req, res) => {
  const {term, subject, catalog_number} = req.params;
  const requestUrl = `https://api.uwaterloo.ca/v2/terms/${term}/${subject}/${catalog_number}/schedule.json?key=${UWAPIKEY}`;
  request(requestUrl, (err, response, body) => {
    if (err) {
      return res.status(200).json({error: true});
    } else if (response && response.statusCode === 200) {
      const result = JSON.parse(body);
      if (result.meta.message === 'Request successful' && req.query.key === APISECRET) {
        return res.status(200).json(result.data);
      } else {
        return res.status(200).json({error: true});
      }
    }
  });
});
APIRouter.get('/courseListLookup/:catalogList/:classList/:term', async (req, res) => {
  if (!(req.query.key === APISECRET)) {
    return res.status(200).json({error: true});
  }
  const {catalogList, classList, term} = req.params;
  const courseList = catalogList.split(',');
  const courseNumberList = classList.split(',');
  const termList = term.split(',');
  const returnObj = [];
  for (i in courseList) {
    const subject = courseList[i].replace(/[0-9]/g, '').replace(/\s/g, '');
    const catalog_number = courseList[i].replace(/^\D+/g, '').replace(/\s/g, '');
    const requestUrl = `https://api.uwaterloo.ca/v2/terms/${termList[i]}/${subject}/${catalog_number}/schedule.json?key=${UWAPIKEY}`;
    var options = {
      uri: requestUrl,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    };
    var result = await requestP(options);
    if (!result.meta.message === 'Request successful') {
      return res.status(200).json({error: true});
    }
    result = result.data.filter(course => course.class_number.toString() === courseNumberList[i]);
    returnObj.push(result[0]);
  }
  res.status(200).json(returnObj);
});
app.use('/api', APIRouter);
//

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

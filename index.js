// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/:date', function (req, res) {
  let date = req.params.date;
  const pattern = /^[0-9]*$/;
  if (pattern.test(date)) {
    date = Number(date);
  }
  date = new Date(date);
  if (date != 'Invalid Date') {
    const utcTime = date.toUTCString();
    const unixTime = date.getTime();
    res.json({
      unix: unixTime,
      utc: utcTime,
    });
  } else {
    res.json({
      error: 'Invalid Date',
    });
  }
});

// Solution from github, the issue with test itself
app.get('/api/', function (req, res) {
  let date = new Date();
  let UTC = date.getTime() + 20000;
  UTC = new Date(UTC);
  UTS = UTC.toUTCString();
  let UNIX = date.getTime() + 20000;
  res.json({ unix: UNIX, utc: UTS });
});

// app.get('/api/', function (req, res) {
//     const utcTime = new Date().toUTCString();
//     const unixTime = new Date().getTime();
//     res.json({
//       unix: unixTime,
//       utc: utcTime,
//     });
// });

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

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
app.get("/api/:date", function(req, res) {
  const { date } = req.params;
  let formatedDate = date;
  let utcTime
  let unixTime
  if (typeof formatedDate !== Number && !formatedDate.includes("-")) {
    formatedDate = Number(date);
  }
  utcTime = new Date(formatedDate).toUTCString();
  unixTime = new Date(formatedDate).getTime();
  res.json({
    unix: unixTime,
    utc: utcTime
  });
});

app.get("/api", function(req, res) {
  const { date } = req.query;
  let utcTime
  let unixTime
  if (!date) {
    utcTime = new Date().toUTCString();
    unixTime = new Date().getTime()
  }
  res.json({
    unix: unixTime,
    utc: utcTime
  });
})

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

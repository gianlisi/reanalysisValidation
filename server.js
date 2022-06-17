//start express web server
var express = require('express');
var cors = require('cors') // Cross-Origin Resource Sharing
var app = express();
app.use(cors())

var port = 3000;

app.listen(port, function () {
    console.log(`server running on http://localhost:${port}`);
    console.log(`Try Getting WOA data at http://localhost:${port}/woa?var=s_an&lat=0&lon=-150`);
})

// select ncep reanalysis subset
app.get('/ncep', function (req, res) {
  var spawn = require('child_process').spawnSync;
  var process = spawn('python', ['./ncep.py', req.query.year, req.query.lat, req.query.lon, ] );
  var obj = JSON.parse(process.stdout)
  res.send(obj.data)
});

// ghcnd observations
app.get('/ghcnd', function (req, res) {
  var spawn = require('child_process').spawnSync;
  var process = spawn('python', ['./ghcnd.py', req.query.year, req.query.lat, req.query.lon, ] );
  var obj = JSON.parse(process.stdout)
  res.send(obj.data)
});


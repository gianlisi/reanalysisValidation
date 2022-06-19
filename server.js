//start express web server
let express = require('express');
let cors = require('cors'); // Cross-Origin Resource Sharing
let app = express();
app.use(cors());

let port = 3000;

app.listen(port, function () {
    console.log(`server running on http://localhost:${port}`);
    console.log(`Try Getting WOA data at http://localhost:${port}/woa?var=s_an&lat=0&lon=-150`);
})

// select ncep reanalysis subset
app.get('/ncep', function (req, res) {
  let spawn = require('child_process').spawnSync;
  let process = spawn('python', ['./ncep.py', req.query.year, req.query.lat, req.query.lon, ] );
  let obj = JSON.parse(process.stdout)
  res.send(obj.data)
});

// ghcnd observations
app.get('/ghcnd', function (req, res) {
  let spawn = require('child_process').spawnSync;
  let process = spawn('python', ['./ghcnd.py', req.query.year, req.query.lat, req.query.lon, ] );
  let obj = JSON.parse(process.stdout)
  res.send(obj.data)
});


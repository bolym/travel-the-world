var path = require('path');
var express = require('express');

var app = express();
var port = process.env.PORT || 3003;

app.get('/', function (req, res, next){

  res.status(200);
  res.sendFile(path.join(__dirname + '/public/index.html'));

});

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/404.html'));
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});

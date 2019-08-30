var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
require('dotenv/config');

var app = express();
var port = process.env.PORT || 3003;

// if (!(process.env.MONGO_HOST && process.env.MONGO_USER && process.env.MONGO_PASSWORD && process.env.MONGO_DB_NAME)){
// 	console.log("#### ERROR FOUND #### - Lacking One Or More Environment Variables!. Quitting.");
// 	throw noEnvError;
// }

// var mongoHost = process.env.MONGO_HOST;
// var mongoPort = process.env.MONGO_PORT || 27017;
// var mongoUser = process.env.MONGO_USER;
// var mongoPassword = process.env.MONGO_PASSWORD;
// var mongoDBName = process.env.MONGO_DB_NAME

app.get('/', function (req, res, next){

  res.status(200);
  res.sendFile(path.join(__dirname + '/public/index.html'));

});

app.get('/visited/:title', function(req, res, next){
  var vidTitle = req.params.title;
  console.log("request recieved!!!!");

  const MongoClient = require('mongodb').MongoClient;
  var Grid = require('gridfs');
  var fs = require('fs');
  const uri = process.env.DB_CONNECTION;
  const client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect(err => {

    const collection = client.db("videos").collection("video_data");
    collection.find({}).toArray(function(err, result){
      if(err){
        res.send(err);
      } else {
        console.log("Location clicked: ", vidTitle);
        console.log(result);
      }
    });
    // var caliVid = collection.findOne();
    // console.log("Cali url", caliVid.url);
    client.close();
  });

});

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/404.html'));
});


  // perform actions on the collection object
	app.listen(port, function () {
	console.log("== Server is listening on port", port);
  });


// MongoClient.connect(mongoUrl, function (err, client) {
//   if (err) {
//     throw err;
//   }
//   db = client.db(mongoDBName);
//
//   //clear and restck database
//   // var tools = db.collection('tools');
//   // tools.deleteMany({});
//   // tools.insertMany(toolsArray);
//
//   app.listen(port, function () {
// 	console.log("== Server is listening on port", port);
//   });
// });

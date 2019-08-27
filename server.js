var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3005;

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

//catch here

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/404.html'));
});

const MongoClient = require('mongodb').MongoClient;
var Grid = require('gridfs');
var fs = require('fs');
const uri = 'mongodb+srv://bolym:Pfssoccerformula1@traveltheworld-wa1l4.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {

  const collection = client.db("videos").collection("video_data");
  collection.find({}).toArray(function(err, result){
    if(err){
      res.send(err);
    } else {
      console.log(result);
    }
  });
  // perform actions on the collection object
	app.listen(port, function () {
	console.log("== Server is listening on port", port);
  });
  client.close();
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

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv/config');

var app = express();
var port = process.env.PORT || 3002;

// if (!(process.env.MONGO_HOST && process.env.MONGO_USER && process.env.MONGO_PASSWORD && process.env.MONGO_DB_NAME)){
// 	console.log("#### ERROR FOUND #### - Lacking One Or More Environment Variables!. Quitting.");
// 	throw noEnvError;
// }

// var mongoHost = process.env.MONGO_HOST;
// var mongoPort = process.env.MONGO_PORT || 27017;
// var mongoUser = process.env.MONGO_USER;
// var mongoPassword = process.env.MONGO_PASSWORD;
// var mongoDBName = process.env.MONGO_DB_NAME

app.use(bodyParser.json());

app.use(cors());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");

  next();
});

app.get('/', function (req, res, next){

  res.status(200);
  res.sendFile(path.join(__dirname + '/public/index.html'));

});


app.get('/visited/:title', function(req, res, next){
  console.log("request for visited recieved on server");

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");

  var vidTitle = req.params.title;
  console.log("Vid Title: ", vidTitle);

  console.log("setting vars for db");
  const MongoClient = require('mongodb').MongoClient;
  var Grid = require('gridfs');
  var fs = require('fs');
  const uri = process.env.DB_CONNECTION;
  const client = new MongoClient(uri, { useNewUrlParser: true });
  console.log("finished setting vars");
  console.log("starting mongo connection");
  client.connect(err => {

    const collection = client.db("videos").collection("video_data");

    //var caliDoc = collection.find({},{title:1});
    collection.find({}).toArray(function(err, result){
      if(err){
        console.log(err);
      } else {
        var allDocs = result;
        console.log(allDocs.length);

        for(var i = 0; i < allDocs.length; i++){
          console.log("Title: ", allDocs[i].title);
          if(allDocs[i].title == vidTitle){
            console.log("matched");
            var vidURL = allDocs[i].url;
            console.log("videoURL: ", vidURL);

            res.redirect('https://res.cloudinary.com/travellingcloud/video/upload/v1565408820/CaliforniaVideo.mp4');
            console.log("redirected");
          }
        }
      }
    });

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

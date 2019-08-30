var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
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

app.use(bodyParser.json());

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

    console.log("California Doc: ");
    //var caliDoc = collection.find({},{title:1});
    collection.find({}).toArray(function(err, result){
      if(err){
        print(err)
      } else {
        var allDocs = result;
        console.log("Vid Title: ", vidTitle);
        for(var i = 0; i < allDocs.length; i++){
          if(allDocs[i].title == vidTitle){
            console.log("matched");
            var vidURL = allDocs[i].url;
            res.writeHead(301,
              {Location: vidURL}
            );
            res.end();
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

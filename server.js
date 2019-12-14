var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv/config');
var sleep = require('sleep');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var cookieParser = require('cookie-parser');

var app = express();
var port = process.env.PORT || 3003;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(bodyParser.json());

app.use(cors());

app.use(cookieParser());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");

  next();
});

app.get('/', function (req, res, next){

  const MongoClient = require('mongodb').MongoClient;
  var Grid = require('gridfs');
  var fs = require('fs');
  const uri = process.env.DB_CONNECTION;
  const client = new MongoClient(uri, { useNewUrlParser: true });
  console.log("starting mongo connection");
  var visited = [];

   client.connect(err => {

    const collection = client.db("videos").collection("video_data");

     collection.find({}).toArray(function(err, result){
      if(err){
        console.log(err);
      } else {
        if(result.length > 0){
          for(var i = 0; i < result.length; i++){
            visited.push(result[i].title);
          }
          console.log("visited: ", JSON.stringify(visited));
          res.cookie("visited", JSON.stringify(visited), { maxAge: 900000, httpOnly: false});
          res.status(200).render('partials/home');
        } else {
          console.log("No docs available.");
          next();
        }
      }
    });
    client.close();
  });

});

app.use(express.static('public'));


app.post('/addVideo/:location', function(req, res, next){

  console.log("Signal recieved for: ", req.params.location);

  var vidLocation = req.params.location;
  var vidLink = req.body.link;
  //cannot access link yet through req.body must figure it out

  console.log("vidLink: ", vidLink);

  if(vidLocation == 'style.css'){
    res.sendFile(path.join(__dirname + '/public/style.css'));
  }

  const MongoClient = require('mongodb').MongoClient;
  var Grid = require('gridfs');
  var fs = require('fs');
  const uri = process.env.DB_CONNECTION;
  const client = new MongoClient(uri, { useNewUrlParser: true });
  console.log("starting mongo connection");

  client.connect(err => {

    const collection = client.db("videos").collection("video_data");
    collection.insertOne(
      {
        title: vidLocation,
        embed: vidLink
      }
    )

    client.close();
  });

  res.status(200).render('partials/home');


});

app.get('/visited/:title', function(req, res, next){

  console.log("Signal recieved for: ", req.params.title);

  var vidTitle = req.params.title;

  if(vidTitle == 'style.css'){
    res.sendFile(path.join(__dirname + '/public/style.css'));
  }

  const MongoClient = require('mongodb').MongoClient;
  var Grid = require('gridfs');
  var fs = require('fs');
  const uri = process.env.DB_CONNECTION;
  const client = new MongoClient(uri, { useNewUrlParser: true });
  console.log("starting mongo connection");
  var allDocs = [];

   client.connect(err => {

    const collection = client.db("videos").collection("video_data");

    //var caliDoc = collection.find({},{title:1});
     collection.find({}).toArray(function(err, result){
      if(err){
        console.log(err);
      } else {
        if(result.length > 0){
          for(var i = 0; i < result.length; i++){
            if(result[i].title == vidTitle){
              var vidEmbed = result[i].embed;
              console.log(vidEmbed);
              var vidArray = [{location: vidTitle, embed: vidEmbed}];
              res.status(200).render('partials/videoPage', {
                videos: vidArray
              });
            }
          }
        } else {
          console.log("No docs available.");
          next();
        }
      }
    });
    client.close();
  });

  console.log("finished mongo connection");

});


app.get('*', function (req, res) {
  res.status(404).render('partials/404');
  //res.sendFile(path.join(__dirname + '/public/404.html'));
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

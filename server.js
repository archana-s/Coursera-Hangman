var express = require('express');
var port = 8000;
var app = express();
var path = require('path');

var hbs = require('hbs');

var COURSERA_SERVER = "http://hangman.coursera.org";
var USER_ACCOUNT = "archana.june@gmail.com";

app.set('views', __dirname + '/public');
app.use(express.static(__dirname + '/public'));

app.engine('html', hbs.__express);
app.set('view engine', 'html');

app.listen(port);
console.log("Express started on " + port);

app.get("/", function(req, res){
  res.render('index');
});

app.get("/startGame", function(req, res){
  var request = require('request');

  var options = {
    url: COURSERA_SERVER + '/hangman/game',
    method: 'POST',
    json: {"email": USER_ACCOUNT}
  };

   var callback = function (error, response, body) {
     if(error) {
       console.log("Errored out while creating a new game instance :", error);
     }
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    };

  request(options, callback);
});

app.get("/guessGame", function(req, res){
  var request = require('request');

  var gameKey = req.query.key;
  var keyGuess = req.query.guess;

  var options = {
    url: COURSERA_SERVER + '/hangman/game/' + gameKey,
    method: 'POST',
    json: {"guess": keyGuess}
  };

   var callback = function (error, response, body) {
     if(error) {
       console.log("Errored out while providing guesses:", error);
     }
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    };

  request(options, callback);
});

app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});


app.use(function(req, res, next) {
  res.status(500);

  // respond with html page
  if (req.accepts('html')) {
    res.render('500', { url: req.url });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Forbidden');
});


app.get("/404", function(req, res){
  res.render("404");
});

app.get("/500", function(req, res){
  res.render("503");
});

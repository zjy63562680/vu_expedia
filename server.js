var express = require('express');
var fs = require('fs');
var request = require('request');
var googleTrends = require('google-trends-api');
var app = express();
var http = require('http');
var path = require("path");
var util = require('util');
var bodyParser = require("body-parser");
var list = [];
var count = 0;

function processUrl (req, res, keyword) {
  function repeat (item) {
    if (!item[count]) {
      count = 0;
      return;
    } else {
      googleTrends.interestOverTime({keyword: item[count], startTime: new Date('2016-02-01'), endTime: new Date('2017-02-01')})
        .then(function(results){
          list.push(results);
          count++;
          fs.writeFile('/data/google_related_ranks.json', JSON.stringify(list, null, 4), function(err){
            console.log('File successfully written! - Check your project directory for the google.json file');
          });
          repeat(item);
        })
        .catch(function(err){
          console.error('Oh no there was an error in more', err);
      });
    }
  } 

  if (keyword && keyword.length) {
    if (keyword.length > 1) {
       repeat (keyword);
    } else if (keyword.length === 1) {
      repeat (keyword);

      googleTrends.relatedTopics({keyword: keyword[0], startTime: new Date('2016-02-01'), endTime: new Date('2017-02-01')})
        .then(function (results) {
          fs.writeFile('data/google_related.json', JSON.stringify(results, null, 4), function(err){
            console.log('Related file successfully written! - Check your project directory for the google.json file');
          });
        })
        .catch(function (err) {
          console.log('Oh no there was an error in less 2', err);
      });
    } else {
      console.log('Yooo');  
    }
  }  else {
    console.log('Good luck');
  } 
}

app.get('/', function(req, res){
  //util.log(util.inspect(req)); // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  //util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url); // this line logs just the method and url
  url = 'https://www.kickstarter.com/projects/1449277917/1681752382?token=b9cbe6aa';
  var title = unescape(req.url);
  var parsed;

    if (title && title.indexOf('?') > -1) {
      parsed = JSON.parse(title.split('?')[1]);
    }

    processUrl(req, res, parsed);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static(__dirname + '/amaka/'));
app.use(express.static(__dirname + '/jessica/'));
app.use(express.static(__dirname + '/fernando/'));
app.use(express.static(__dirname + '/data/'));
app.use(express.static(__dirname + '/'));

app.use(bodyParser.json({}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen('8000');

exports = module.exports = app;

var express = require('express');
var fs = require('fs');
var request = require('request');
var googleTrends = require('google-trends-api');
var app = express();
var http = require('http');
var path = require("path");
var util = require('util');
var bodyParser = require("body-parser");

function processUrl (req, res, keyword) {
  if (keyword && keyword.length > 1) {
      googleTrends.interestOverTime({keyword: keyword, startTime: new Date('2016-02-01'), endTime: new Date('2017-02-01')})
        .then(function(results){
          fs.writeFile('google_related_ranks' + i + '.json', JSON.stringify(results, null, 4), function(err){
            count++;//console.log('File successfully written! - Check your project directory for the google.json file');
          });
        })
        .catch(function(err){
          console.error('Oh no there was an error in more', err);
      });
  } else if (keyword && keyword.length === 1) {
    googleTrends.interestOverTime({ keyword: keyword[0], startTime: new Date('2016-02-01'), endTime: new Date('2017-02-01')})
        .then(function(results){
          fs.writeFile('google_main_ranks.json', JSON.stringify(results, null, 4), function(err){
            //console.log('File successfully written! - Check your project directory for the google.json file');
          });
        })
        .catch(function(err){
          console.error('Oh no there was an error in less 1', err);
      });

      googleTrends.relatedTopics({keyword: keyword[0], startTime: new Date('2016-02-01'), endTime: new Date('2017-02-01')})
        .then(function (results) {
          fs.writeFile('google_related.json', JSON.stringify(results, null, 4), function(err){
            //console.log('File successfully written! - Check your project directory for the google.json file');
          });
        })
        .catch(function (err) {
          console.log('Oh no there was an error in less 2', err);
      });
  } else {
    console.log('Good luck');
  }
  
  res.sendFile(path.join(__dirname + '/index.html'));
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
});

app.post('/', function(req, res){
});

app.use(express.static(__dirname + '/'));

app.use(bodyParser.json({}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen('8090');

exports = module.exports = app;

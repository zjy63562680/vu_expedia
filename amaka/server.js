var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var googleTrends = require('google-trends-api');
var app = express();
var http = require('http');
var path = require("path");
var countrynames = require("countrynames");
var formidable = require("formidable");
var util = require('util');

function processUrl (req, res, url) {
  //request(url, function(error, response, html){
    var json = { category : '', country : '', goal: ''};

    googleTrends.interestOverTime({keyword: req.url, startTime: new Date('2016-02-01'), endTime: new Date('2017-02-01')})
      .then(function(results){
        //console.log('These results are awesome', results);
        fs.writeFile('google.json', JSON.stringify(results, null, 4), function(err){
          //console.log('File successfully written! - Check your project directory for the google.json file');
        });
      })
      .catch(function(err){
        console.error('Oh no there was an error', err);
    });

    googleTrends.relatedTopics({keyword: req.url, startTime: new Date('2016-02-01'), endTime: new Date('2017-02-01')})
      .then(function (results) {
        fs.writeFile('google_related.json', JSON.stringify(results, null, 4), function(err){
          //console.log('File successfully written! - Check your project directory for the google.json file');
        });
          
      })
      .catch(function (err) {
        console.log(err);
    });

    res.sendFile(path.join(__dirname + '/index.html'));
    res.write("hi i mm server");
    res.end();
    req.on('data', function (chunk) {
        console.log('GOT DATA!');
    });
  //});
}

app.get('/', function(req, res){
  util.log(util.inspect(req)); // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
    util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url); // this line logs just the method and url
  url = 'https://www.kickstarter.com/projects/1449277917/1681752382?token=b9cbe6aa';
  processUrl(req, res, req.url.split('?')[1]);
});

app.post('/', function(req, res){
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.listen('8020');


console.log('Magic happens on port 8090');
exports = module.exports = app;

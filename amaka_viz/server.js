var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var googleTrends = require('google-trends-api');
var app = express();
var http = require('http');
var path = require("path");
var countrynames = require("countrynames");

app.get('/', function(req, res){
  url = 'https://www.kickstarter.com/projects/1449277917/1681752382?token=b9cbe6aa';

  request(url, function(error, response, html){
    var json = { category : '', country : '', goal: ''};
    if(!error){
      var $ = cheerio.load(html);

      var title, country, category;

      $('a[href*="places"]').filter(function(){
        var data = $(this);
        country = data.text().trim().split(", ").pop();

        json.country = countrynames.getCode(country);
      });

      $('a[href*="categories"]').filter(function(){
        var data = $(this);
        category = data.text().trim();

        json.category = category;
      });

      $('div.num').filter(function(){
        var data = $(this);
        goal = data.attr('data-goal');

        json.goal = goal;
      });
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    });

    googleTrends.interestByRegion({keyword: json.category, startTime: new Date('2016-02-01'), endTime: new Date('2017-02-01'), resolution: 'COUNTRY'})
      .then(function(results){
        //console.log('These results are awesome', results);
        fs.writeFile('google.json', JSON.stringify(results, null, 4), function(err){
          console.log('File successfully written! - Check your project directory for the output.json file');
        });
      })
      .catch(function(err){
        console.error('Oh no there was an error', err);
    });

    res.sendFile(path.join(__dirname + '/index.html'));
  });
});

app.listen('8080');
console.log('Magic happens on port 8080');
exports = module.exports = app;

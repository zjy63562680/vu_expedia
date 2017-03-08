var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  url = 'https://www.kickstarter.com/projects/1449277917/1681752382?token=b9cbe6aa';

  request(url, function(error, response, html){
    var json = { category : '', country : '', goal: ''};
    if(!error){
      var $ = cheerio.load(html);

      var title, country, category;

      $('a[href*="places"]').filter(function(){
        var data = $(this);
        country = data.text().trim();
        console.log(country);
        json.country = country;
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
      console.log(err);
      console.log('File successfully written! - Check your project directory for the output.json file');
    });
    console.log(json);
    res.send('Check your console!');
  });
});

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;

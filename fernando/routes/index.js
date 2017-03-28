var express = require('express');
var router = express.Router();
var fs = require('fs');
var googleTrends = require('../node_modules/google-trends-api/lib/google-trends-api.min.js');
var jsonfile = require('jsonfile')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index2', { title: 'Express' });
});


var http = require('http');
var path = require("path");
var util = require('util');
var bodyParser = require("body-parser");
var list = [];
var count = 0;

function processUrl (req, res, keyword) {
  function repeat (item) {
    console.log('first' + list.length, count, item, item[count]);
    if (!item[count]) {
      count = 0;
      return;
    } else {
      googleTrends.interestOverTime({keyword: item[count], startTime: new Date('2016-02-01'), endTime: new Date('2017-02-01')})
        .then(function(results){
          list.push(results);
          count++;
          fs.writeFile('google_related_ranks.json', JSON.stringify(list, null, 4), function(err){
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
          fs.writeFile('google_related.json', JSON.stringify(results, null, 4), function(err){
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



// exports = module.exports = app;
module.exports = router;



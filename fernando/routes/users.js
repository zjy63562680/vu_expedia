var express = require('express');
var router = express.Router();
var fs = require('fs');
var googleTrends = require('../node_modules/google-trends-api/lib/google-trends-api.min.js');
var jsonfile = require('jsonfile')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


googleTrends.relatedTopics({keyword: 'Neymar', startTime: new Date('2015-01-01'), endTime: new Date('2017-02-10'), geo: 'US-CA'})
.then((res) => {
var json_file = JSON.parse(res);
  console.log(json_file['default']);
})
.catch((err) => {
  console.log(err);
});

module.exports = router;

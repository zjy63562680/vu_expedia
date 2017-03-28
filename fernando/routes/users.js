var express = require('express');
var router = express.Router();
var fs = require('fs');
var googleTrends = require('../node_modules/google-trends-api/lib/google-trends-api.min.js');
var jsonfile = require('jsonfile')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


googleTrends.relatedTopics({keyword: 'Neymar', geo: 'DE'})
.then((res) => {
var json_file = JSON.parse(res);
  console.log(json_file);
})
.catch((err) => {
  console.log(err);
});


function google_words(words){
var list = [];
googleTrends.interestByRegion({keyword: words})
.then((res) => {
	
	var json_file = JSON.parse(res);
	json_file['default']['geoMapData'].forEach(function(element){
	list.push([element['geoCode'],element['formattedValue'][0]])


  })
	jsonfile.writeFile('./public/data/trends.txt', list)
})
.catch((err) => {
  console.log(err);
})
}

google_words('Neymar');

module.exports = router;

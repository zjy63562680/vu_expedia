var express = require('express');
var router = express.Router();
var fs = require('fs');
var googleTrends = require('../node_modules/google-trends-api/lib/google-trends-api.min.js');
var jsonfile = require('jsonfile')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


function google(category){

googleToFile(category);
google_words(category);

}


function googleToFile(topic){
var countries = ['DE','FR','NL','GB','ES','BE','IT','IE']
var testing = [];

countries.forEach(function(element2){

googleTopics(element2)
function googleTopics(geo){
googleTrends.relatedTopics({keyword: topic, geo: element2})
.then((res) => {
var json_file = JSON.parse(res);
var oj = json_file['default']['rankedList'][0]['rankedKeyword']

for (var x=0; x< oj.length;x++){
testing.push([geo,oj[x].topic.title, oj[x].value])};
jsonfile.writeFile('./public/data/words.txt',testing)
}) }  })}


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

google('ISIS')


module.exports = router;

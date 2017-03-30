var express = require('express');
var fs = require('fs');
var request = require('request');
var googleTrends = require('google-trends-api');
var app = express();
var http = require('http');
var path = require("path");
var util = require('util');
var jsonfile = require('jsonfile');
var bodyParser = require("body-parser");
var list = [];
var count = 0;

app.get('/', function(req, res){
  //util.log(util.inspect(req)); // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  //util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url); // this line logs just the method and url
  url = 'https://www.kickstarter.com/projects/1449277917/1681752382?token=b9cbe6aa';
  var title = unescape(req.url);
  var parsed, parsedCategory, parsedName;

    if (title && title.indexOf('?') > -1) {
      parsed = JSON.parse(title.split('?')[1]);
      parsedCategory = parsed[0];
      parsedName = parsed[1];
      google(parsedCategory);
      googleOvertime(['appel','google']);
      console.log(parsedName, parsedCategory);
    }
    res.sendFile(path.join(__dirname + '/index.html'));
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
jsonfile.writeFile('./data/words.txt',testing)
}) }  })}


function google_words(words){
var list = [];
googleTrends.interestByRegion({keyword: words})
.then((res) => {
  
  var json_file = JSON.parse(res);
  json_file['default']['geoMapData'].forEach(function(element){
  list.push([element['geoCode'],element['formattedValue'][0]])
  })
  jsonfile.writeFile('./data/trends.txt', list)
})
.catch((err) => {
  console.log(err);
})
}



function googleOvertime(word){
  first='name 2004-01 2004-02 2004-03 2004-04 2004-05 2004-06 2004-07 2004-08 2004-09 2004-10 2004-11 2004-12 2005-01 2005-02 2005-03 2005-04 2005-05 2005-06 2005-07 2005-08 2005-09 2005-10 2005-11 2005-12 2006-01 2006-02 2006-03 2006-04 2006-05 2006-06 2006-07 2006-08 2006-09 2006-10 2006-11 2006-12 2007-01 2007-02 2007-03 2007-04 2007-05 2007-06 2007-07 2007-08 2007-09 2007-10 2007-11 2007-12 2008-01 2008-02 2008-03 2008-04 2008-05 2008-06 2008-07 2008-08 2008-09 2008-10 2008-11 2008-12 2009-01 2009-02 2009-03 2009-04 2009-05 2009-06 2009-07 2009-08 2009-09 2009-10 2009-11 2009-12 2010-01 2010-02 2010-03 2010-04 2010-05 2010-06 2010-07 2010-08 2010-09 2010-10 2010-11 2010-12 2011-01 2011-02 2011-03 2011-04 2011-05 2011-06 2011-07 2011-08 2011-09 2011-10 2011-11 2011-12 2012-01 2012-02 2012-03 2012-04 2012-05 2012-06 2012-07 2012-08 2012-09 2012-10 2012-11 2012-12 2013-01 2013-02 2013-03 2013-04 2013-05 2013-06 2013-07 2013-08 2013-09 2013-10 2013-11 2013-12 2014-01 2014-02 2014-03 2014-04 2014-05 2014-06 2014-07 2014-08 2014-09 2014-10 2014-11 2014-12 2015-01 2015-02 2015-03 2015-04 2015-05 2015-06 2015-07 2015-08 2015-09 2015-10 2015-11 2015-12 2016-01 2016-02 2016-03 2016-04 2016-05 2016-06 2016-07 2016-08 2016-09 2016-10 2016-11 2016-12 2017-01 2017-02 2017-03'+'\n'
  fs.writeFileSync("./data/test.txt",first);

  var index =-1;
  for(x=0 ; x < word.length; x++){
    googleTrends.interestOverTime({keyword: word[x]}).then((res) => {
      values = [];
      json_file = JSON.parse(res);
      data = json_file['default']['timelineData']
      index +=1
      data.forEach(function(e){
        var dateString2 = moment.unix(e.time).format("YYYY-MM");
        values.push( e.value[0]);
      })
      if(x ==0){
        a = values.join("\t")
        b = word[index]+'\t'+ a+'\n'
        fs.appendFileSync("./data/test.txt",b)
      }
      if(x> 0){
        c = word[index] + '\t'+ values.join("\t")+'\n'
        fs.appendFileSync("./data/test.txt",c) 
      }
    })
  }
}

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

app.listen('8050');

exports = module.exports = app;

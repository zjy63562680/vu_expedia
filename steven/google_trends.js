var googleTrends = require('google-trends-api');
googleTrends.interestOverTime({keyword: 'blockchain',startTime: new Date('Dec-2016'), endTime: new Date('Feb-2017')})
.then(function(results){
	 fs.writeFile('google.json', JSON.stringify(results, null, 4), function(err){
          console.log('File successfully written! - Check your project directory for the output.json file');
        });
	
})
.catch(function(err){
  console.error(err);
});


res.sendFile(path.join(__dirname + '/index.html'));

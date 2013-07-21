var express = require('express');
var fs = require('fs');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  var buff = fs.readFileSync('./index.html', function(err, data){
      if (err) {
	  console.log('Error processing file');
	  return;
      }

      return new Buffer(data);
      
  });

    response.send(buff.toString());
    
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


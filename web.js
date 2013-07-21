var express = require('express');
var app = express();
var fs = require('fs');
app.use(express.logger());

app.get('/', function(request, response) {
  response.send(index.write());
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

var index = fs.readFileSync('index.html', function(err, data) {
 if (err) throw err;
 return new Buffer(data);
});

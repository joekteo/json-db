/*jshint node: true*/
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(bodyParser.json());

app.route('/:userName')
  .get(function(req, res) {
    var file = ('./app/' + req.params.userName + '.json');
    var stream = fs.createReadStream(file);
    stream.on('error', function(err) {
      console.log('Error', err);
      res.send(err);
    });
    stream.on('readable', function() {
      res.writeHead(200, {'Content-Type': 'application/json'});
      stream.pipe(res);
    });
  })

  .post(function(req, res) {
    var ws = fs.createWriteStream('./app/' + req.params.userName + '.json');
    ws.write(JSON.stringify(req.body));
    res.send(req.body);
  });

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server running on port: ' + port);
});

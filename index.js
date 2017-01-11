var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');

http.createServer(function(req, res) {

  console.log(req.method, req.url);

  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    default:
      contentType = 'text/html';
      break;
  }

  if (req.url === '/') {
    fs.readFile('index.html', 'UTF-8', function (err, content) {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    })

  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 File Not Found');
  }

}).listen(process.env.PORT || 3000);


console.log('hello');

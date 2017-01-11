var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');


http.createServer(function(req, res) {

  console.log(req.method, req.url);

  var filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  var contentType = 'text/html';
  var extname = path.extname(filePath);
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

//  if (req.url === '/') {
  fs.readFile(filePath, 'UTF-8', function (err, content) {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 File Not Found');
      } else {
        throw err;
      }
    } else {
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
    }
  });


}).listen(process.env.PORT || 3000);


console.log('Server started');

var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');

var app = express();
var dataFile = require('./data/team.json');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.send(`
    <h1>Welcome</h1>
    <p>Some Sort of Generic Business</p>
  `);
  })
  app.get('/about', function(req, res) {
    res.send(`
      <h1>Our Company</h1>
      <p>Founded in 1892, our company has grown into a worldwide import/export leader.</p>
    `);
    })


  app.get('/team', function(req, res) {
    var info = '';
    dataFile.team.forEach(function(item) {
      info += `
      <li>
        ${item.name}
        <p>${item.title}</p>
        <p>${item.description}</p>
      </li>
      `})
  res.send(`
    <h1>Team</h1>
    ${info}
    `);
});

app.get('/team/:memberid', function(req, res) {
  var teamMember = dataFile.team[req.params.memberid];
res.send(`
  <h1>${teamMember.name}</h1>
  <h2>${teamMember.title}</h2>
  <p>${teamMember.description}</p>
  `);
});

var server = app.listen(app.get('port'), function() {
  console.log('server is listening on port ' + app.get('port'));
});

// http.createServer(function(req, res) {
//
//   console.log(req.method, req.url);
//
//   var filePath = '.' + req.url;
//   if (filePath === './') {
//     filePath = './index.html';
//   }
//
//   var contentType = 'text/html';
//   var extname = path.extname(filePath);
//   switch (extname) {
//     case '.js':
//       contentType = 'text/javascript';
//       break;
//     case '.css':
//       contentType = 'text/css';
//       break;
//     default:
//       contentType = 'text/html';
//       break;
//   }
//
// //  if (req.url === '/') {
//   fs.readFile(filePath, 'UTF-8', function (err, content) {
//     if (err) {
//       if (err.code === "ENOENT") {
//         res.writeHead(404, {'Content-Type': 'text/plain'});
//         res.end('404 File Not Found');
//       } else {
//         throw err;
//       }
//     } else {
//     res.writeHead(200, { 'Content-Type': contentType });
//     res.end(content, 'utf-8');
//     }
//   });
// }).listen(process.env.PORT || 3000);

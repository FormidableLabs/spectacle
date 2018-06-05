/* eslint-disable */

var path = require('path');
var ip = require('ip');
var http = require('http');
var express = require('express');
const WebSocket = require('ws');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);
var webpackDev = require('webpack-dev-middleware');

app.use(
  webpackDev(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

const port = 3000;
server.listen(port, function listening(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://' + 'localhost' + ':' + port);
  console.log('Listening at http://' + ip.address() + ':' + port);
});

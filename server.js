/* eslint-disable */
var server = require('http').createServer();
var WebSocketServer = require('uws').Server;
var wss = new WebSocketServer({ server: server });
var url = require('url');
var path = require("path");
var express = require("express");
var webpack = require("webpack");
var config = require("./webpack.config");
const util = require('util')
var app = express();
var compiler = webpack(config);
var port = 3000;
var host = 'localhost';
var state = {
  "state": {
    "fragment": {
      "fragments": {}
    },
    "route": {
      "slide": 0,
      "params": []
    },
    "style": {
      "globalStyleSet": true
    }
  },
  "type": "REMOTE_STATE"
};

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

wss.on('connection', function connection(ws) {
  const location = url.parse(ws.upgradeReq.url, true);
  // you might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  ws.on('message', function incoming(message) {
    const payload = JSON.parse(message);
    // console.log('received: ', util.inspect(message, false, null));
    state = payload;
    wss.clients.forEach(function (client) {
      if (client !== ws) client.send(message);
    });
  });

  ws.on('close', function close() {
    console.log('socket disconnected');
  });

  ws.send(
    JSON.stringify(state)
  );
  /**
  state.forEach(function (op) {
    ws.send(op);
  });
  **/
});

server.on('request', app);
server.listen(
  port, 
  host,
  function (err) { 
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Listening on http://${host}:${server.address().port}`) 
  }
);

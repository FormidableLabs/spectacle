const handler = require('serve-handler');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
  const pathname = url.parse(request.url).pathname;
  // we can import from above the root (i.e. import Spectacle from '../../')
  // so we intercept the spectacle request and return the right file
  if (pathname === '/dist/esm/spectacle.development.js') {
    const spectacleLocation = path.join(__dirname, '../', '../', pathname);
    const spectacle = fs.readFileSync(spectacleLocation, 'binary');
    response.writeHead(200, {
      'Content-Type': 'text/javascript',
      'Access-Control-Allow-Origin': '*'
    })
    response.write(spectacle, 'binary');
    return response.end();
  }
  return handler(request, response);
})

server.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});
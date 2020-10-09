var http = require('http');
var Routes = require('./routes/Routes');
const { Request } = require('./Request');
const { Response } = require('./Response');

let routes = [];
let callbacks = [];
var server = http.createServer(function(req, res) {
  //create web server
  for (const index in routes) {
    if (
      Routes.isMatching(req.url, routes[index].route) &&
      req.method === routes[index].method
    ) {
      Request(req, routes[index].route, (request, error) => {
        const response = Response(res);
        callbacks[index](request, response);
      });
    }
    break;
  }
});

const get = (...args) => {
  let route, callback;
  route = args[0];
  callback = args[1];

  routes.push({
    route,
    method: 'GET',
  });
  callbacks.push(callback);
};

const post = (...args) => {
  let route, callback;
  route = args[0];
  callback = args[1];

  routes.push({
    route,
    method: 'POST',
  });
  callbacks.push(callback);
};

const listen = (port, cb) => {
  try {
    const run = server.listen(port);
    cb(`Server running on port ${port}`);
  } catch (e) {
    cb('error occured while starting server. ');
  }
};

module.exports = {
  get,
  post,
  listen,
};

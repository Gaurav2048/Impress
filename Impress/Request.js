const Request = (req, route, cb) => {
  // required URL structure
  // /user/:id/comment/:comment

  let header = req.headers;
  let content_type = header['content-type'];

  let bodyStr = '';
  req
    .on('data', (chunk) => {
      bodyStr += chunk.toString();
    })
    .on('error', (error) => {
      cb(null, error);
    })
    .on('end', () => {
      const params = parseUrlData(req.url, route);
      req.body = JSON.parse(bodyStr);
      req.params = params;
      cb(req);
    });
};

const parseUrlData = (url, route) => {
  const routeSplit = route.split('/');
  const urlSplit = url.split('/');
  let param = {};
  if (routeSplit.length !== urlSplit.length) {
    throw Error('invalid request');
  }
  routeSplit.forEach((segment, index) => {
    if (segment.indexOf(':') === 0) {
      const key = segment.split(1, segment.length - 1);
      const value = urlSplit[index];
      param[key] = value;
    }
  });
  return param;
};

module.exports = {
  Request,
};

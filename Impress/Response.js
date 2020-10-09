const Response = (res) => {
  const send = (status, json) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(json));
    res.end('');
  };
  res['send'] = send;
  console.log(res);

  return res;
};

module.exports = {
  Response,
};

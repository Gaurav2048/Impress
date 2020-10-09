var Impress = require('./Impress/Impress');

Impress.post('/one/:id/comment/:comments', function(req, res) {
  res.send(200, {
    body: req.body,
    params: req.params,
  });
});

Impress.listen(9000, function(message) {
  console.log(message);
});

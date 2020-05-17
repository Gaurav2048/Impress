var Impress = require('./Impress/Impress')

Impress.get('/one/:id', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({
        method:"get", 
        message:"successfully completed. "
    }))
    res.end('')
})

Impress.post('/one/:id/comment/:comments', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({
        method:"post", 
        message:"successfully completed. "
    }))
    res.end('')
})

Impress.listen(9000, function(message){
    console.log(message);
    
})

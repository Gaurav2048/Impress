var Impress = require('./Impress/Impress')

Impress.get('/', (req, res) => {
    res.send(200, JSON.stringify("Dummy text"))
})

Impress.get('/def/:ti',(req, res, next) => {
    req.params.ti = req.params.ti + 'extension';
    next(); 
}, (req, res) => {
    res.send(200, JSON.stringify(req.params))
})

Impress.listen(3000, ()=>{
    console.log('server up.');
})
module.exports = Impress;
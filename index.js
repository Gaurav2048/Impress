var Impress = require('./Impress/Impress')


const auth = (req, res, next) =>{
    setTimeout(()=>{
        console.log('auth middleware passed!');
    next()
    }, 200) 
}

const secondaryAuth = (req, res, next) =>{
   setTimeout(()=>{
    console.log('sec auth middleware passed!', typeof next);
    next()    
   }, 300)
}



const TAuth = (req, res, next) =>{
   setTimeout(()=>{
    console.log('T auth middleware passed!', typeof next);
    next()    
   }, 400)
}


const BAuth = (req, res, next) =>{
   setTimeout(()=>{
    console.log('B auth middleware passed!', typeof next);
    next()    
   }, 450)
}

Impress.post('/one', auth, secondaryAuth, TAuth, BAuth,  function (req, res) {
    res.send(200, "method executed")
    console.log('one');

})

Impress.listen()
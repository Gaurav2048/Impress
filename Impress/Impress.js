var http = require('http');
var Routes = require('./routes/Routes')
var { Request } = require('./Request')
var {Middlewares} = require('./Middleware/Middleware')
var { Response } = require('./Response')

let routes = []
let callbacks = []
let middlewares = []
var server = http.createServer(function (req, res) {   //create web server

    for (const index in routes) {
        
        if (Routes.isMatching(req.url, routes[index].route) && req.method === routes[index].method) {
            Request(req, routes[index].route, (request, error) => {
                if(error !== null){

                }
                const response = Response(res)
                if(routes[index].hasMiddleWare){

                    Middlewares(request, response, middlewares[index], function(newReq, newRes){
                        callbacks[index](newReq, newRes);
                    })
                }else{                    
                    callbacks[index](request, response);    
                }
               
            })
            break;
        }
    }

});


const  get = (...args) => {
    console.log('arg',args);
    let route , middleware = [] , callback
    if(args.length === 2 ){
        route = args[0]
        callback = args[1]
    }else if(args.length > 2){
        route = args[0]
        callback = args[args.length-1]
        for(let i = 1; i<args.length-1; i++){
            middleware.push(args[i])
        }        
    }
    routes.push({
        route, 
        hasMiddleWare : middleware.length !== 0 , 
        method:'GET'
    })
    middlewares.push(middleware);
    callbacks.push(callback)
}

const  post = (...args) => {
    console.log('arg',args);
    let route , middleware = [] , callback
    if(args.length === 2 ){
        route = args[0]
        callback = args[1]
    }else if(args.length > 2){
        route = args[0]
        callback = args[args.length-1]
        for(let i = 1; i<args.length-1; i++){
            middleware.push(args[i])
        }
        middlewares.push(middleware)
        
    }
    routes.push({
        route, 
        hasMiddleWare : middleware.length !== 0 , 
        method:'POST'
    })
    callbacks.push(callback)
}

const  put = (...args) => {
    console.log('arg',args);
    let route , middleware = [] , callback
    if(args.length === 2 ){
        route = args[0]
        callback = args[1]
    }else if(args.length > 2){
        route = args[0]
        callback = args[args.length-1]
        for(let i = 1; i<args.length-1; i++){
            middleware.push(args[i])
        }
        middlewares.push(middleware)
        
    }
    routes.push({
        route, 
        hasMiddleWare : middleware.length !== 0 , 
        method:'PUT'
    })
    callbacks.push(callback)
}



const listen = (port, cb) => {
    const run = server.listen(port, cb)
}


module.exports = {
 get, post, listen, put
}
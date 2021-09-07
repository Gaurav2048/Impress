const Middlewares = (req, res, middlewareArray , cb ) =>{

    if(!Array.isArray(middlewareArray)){
        throw Error('Internal No middleware array found.')
    }

    let i = 0

    const executeMiddleWare = i =>{    
        if(i===middlewareArray.length){
            cb(req, res)
            return
        }
       
        middlewareArray[i](req, res, ()=>{
            i++
            executeMiddleWare(i)
        })    
    }

    executeMiddleWare(i)
}

module.exports = {
    Middlewares
}
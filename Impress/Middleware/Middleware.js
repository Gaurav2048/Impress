const Middlewares = (req, res, middlewareArray , cb ) =>{

    if(!middlewareArray instanceof Array){
        throw Error('Internal No middleware array found.')
    }

    let i = 0

    const executeMiddleWare = i =>{
        console.log('count', i);
        
        if(i===middlewareArray.length){
            cb(req, res)
            return
        }
       
        middlewareArray[i](req, res, ()=>{
            console.log(i);
            i++
            executeMiddleWare(i)
        })    
    }

    executeMiddleWare(i)

}

module.exports = {
    Middlewares
}
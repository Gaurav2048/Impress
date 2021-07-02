const Request = (req, route ,cb) => {
  // required URL structure
  // /user/:id/comment/:comment

  let header = req.headers
  let content_type = ''
  let boundary = ''
  if(header["content-type"].indexOf(";") === -1 ){
      content_type = header["content-type"]
  }else {
      content_type = header["content-type"].substring(0,header["content-type"].indexOf(";")); 
      boundary = header["content-type"].substring(header["content-type"].indexOf(";")+1, header["content-type"].length-1);
      boundary = boundary.substring(boundary.indexOf("=")+1, boundary.length-1)
  }

      let bodyStr = ''
      req.on('data', chunk => {
          bodyStr += chunk.toString(); 
      })
      .on('error', error=>{
          cb(null, error)
      })
      .on('end', () => {
          if(content_type==="application/json"){
              const params = parseUrlData(req.url , route)
               cb({...req , body: JSON.parse(bodyStr) , params})
          }else if (content_type==="multipart/form-data"){
              const argArray = body.split(boundary)
              return extractMultiformData(argArray)
          }
      });



}

const parseUrlData = ( url , route ) =>{
  const routeSplit = route.split('/')
  const urlSplit = url.split('/')
  let param = {}
  if(routeSplit.length !== urlSplit.length){
      throw Error('invalid request')
  }
  routeSplit.forEach((segment, index)=>{
      if(segment.indexOf(':') === 0){
          const key = segment.split(1, segment.length-1)
          const value = urlSplit[index]
          param[key] = value
      }
  })
  return param

}

  const extractMultiformData = argArray =>{
      if(!argArray instanceof Array) {
          throw Error('Must provide an array'); 
      }

      const body = {}
      console.log(argArray);
      
      argArray.forEach(item =>{
          if(item !== '' || item !== '--' ){
              let keyValSplit = item.split('\n'); 
              const keyString = keyValSplit[0].substring(keyValSplit[0].indexOf(';')+1, keyValSplit[0].length -1); 
              const key = keyString.split("=")[1]
              body[key] = keyValSplit[1]
          }
      })
      return body

  }

  module.exports = {
      Request
  }
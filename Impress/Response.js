const Response = res => {
    
    
  const send = (status , json) =>{
      res.writeHead(status, { 'Content-Type': 'application/json' });
      res.write(json)
      res.end('')
  }

  return {...res , send}
}

module.exports = {
  Response
}
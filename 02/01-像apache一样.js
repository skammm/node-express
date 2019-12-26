

  const  http = require('http');

  const server = http.createServer();
  
  const fs = require('fs')

  var wwwDir = 'D:/app/www';

  server.on('request',function(req,res){
    var url = req.url;
    var filePath = '/index.html';
    if(url !== '/'){
      filePath = url;
    }
    fs.readFile(`${wwwDir}${filePath}`,function(err,data){
      if(err){
        res.end('404 not found');
        return;
      }
      res.end(data)
    })

    
  })

  server.listen('3000',function(){
    console.log('服务器启动成功')
  })
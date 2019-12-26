  //服务端渲染和客户端渲染的区别
  //+客户端渲染(异步获取数据)不利于SEO搜索引擎的优化，需要多次请求，但请求速度快，可局部刷新页面
  //+服务端渲染可以被爬虫抓取，客户端很难被爬虫搜索
  //+真正的网站是两者结合来做的
  var http = require('http');
  var fs = require('fs');
  var template = require('art-template');
  var server = http.createServer();
  var wwwDir = 'D:/app/www';
  server.on('request',function(req,res){
    //每次向服务器请求资源的时候都要读取文件
   if(req.url === '/'){
    fs.readFile('./tpl2.html',function(err,data){
      if(err){
        console.log('读取文件失败');
        return;
      }
      //fs.readdir得到目录列表中的文件名和目录名
      fs.readdir(wwwDir,function(err,file){
        if(err){
          return res.end('not found file')
        }
        var ret = template.render(data.toString(),{
          files:file
        })
      

        res.end(ret);
      })
    })
   }else if(req.url.indexOf('/lib/') !== -1){//为了请求静态资源
     fs.readFile('../'+req.url,function(err,data){
       if(err){
         return res.end('not found');
       }
       res.end(data);
     })
   }
  })

  server.listen('3000',function(){
    console.log('启动服务')
  })

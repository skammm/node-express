  //模块查找机制
  //  优先从缓存加载
  //  核心模块
  //  路径形式的文件模块
  //  第三方模块
  //     node_module中找到该文件，找到该文件中的package.json中的main属性指向的文件，执行该文件
  //package.json是包描述文件，可以从该包中看出你的文件依赖了哪些第三方包

  var http = require('http');
  var fs = require('fs');
  var url = require('url');
  var template = require('art-template');
  
  var comments = [
    {
      name:'zz',
      message:'wwwww',
      date:'2020-1-1'
    },
    {
      name:'zz',
      message:'wwwww',
      date:'2020-1-1'
    },
    {
      name:'zz',
      message:'wwwww',
      date:'2020-1-1'
    }
  ]
  http.createServer(function(req,res){
    //使用核心模块url来解析路径
    var parseObj = url.parse(req.url,true);
    var pathurl = parseObj.pathname;
    if(pathurl === '/'){
      fs.readFile('./view/index.html',function(err,data){
        if(err){
          return err.end('读取文件失败')
        }
        var ret = template.render(data.toString(),{
          comments:comments
        })
        res.end(ret);
      })
    }else if(pathurl.indexOf('/lib/')!==-1){
      fs.readFile('./'+pathurl,function(err,data){
        if(err){
          return err.end('读取文件失败')
        }
        res.end(data);
      })
    }else if(pathurl === '/post'){
      fs.readFile('./view/post.html',function(err,data){
        if(err){
          return err.end('读取文件失败')
        }
        res.end(data);
      })
    }else if(pathurl === '/pinglun'){
      //1.query拿到路径中的数据对象
      //2.将对象加入到comments对象中
      //3.让用户重定向跳转到首页/
      var comment = parseObj.query;
      comment.date = '2020-1-1';
      comments.unshift(comment);
      //如何通过服务器让客户重定向？
      //  1.状态码设置为302临时重定向
      //  2.在响应头中通过Location告诉客户端往哪重定向
      res.statusCode = 302;
      res.setHeader('Location','/');
      res.end();
    }else{
      res.end('404 not found');
    }

  }).listen('3000',function(){
    console.log('服务器启动')
  })
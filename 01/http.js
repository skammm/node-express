//使用node可以很轻松的构建一个web服务器
//在node中专门提供了一个核心的模块
//http这个模块就是专门帮你创建一个服务器的


//1.加载http核心模块
//
var http = require('http');
var fs  = require('fs');

//2.使用http.createServer()方法创建一个服务器
//返回一个Server实例

var server = http.createServer();


//3.服务器要干嘛？
//    提供对数据服务，接受请求，处理请求，发送响应
//当客户端请求过来，会自动触发服务器端的request请求事件，然后执行回掉函数
server.on('request',function(request,response){
  console.log(request.url);
 
   //响应头,需要查询响应头可以看http://tool.occhina.net/commons
   response.setHeader('Content-Type','text/plain;charset=utf-8');
   if(request.url === '/fruit'){
    response.end(JSON.stringify(product));//返回响应同时结束响应
   }else if(request.url === '/html'){
    response.setHeader('Content-Type','text/html;charset=utf-8');
    response.end('<p>hahaa<a href="#">点我</a></p>')
   }else if(request.url == '/index'){
     fs.readFile('../resource/index.html',function(err,data){
       if(err){
         console.log(err)
       }else{
        response.setHeader('Content-Type','text/html;charset=utf-8');
         response.end(data);
       }
     })
   }else if(request.url === '/xz'){
     fs.readFile('../resource/x7.jpg',function(err,data){
       if(err){
         console.log(err)
       }else{
        response.setHeader('Content-Type','	image/jpeg')
        response.end(data)
       }
     })
   }else{
    response.end('404');
   }
})

 //服务器收到请求，响应内容，响应内容只能是二进制数据或字符串
  //中文浏览器是以gdk编码解析字符串，服务器返回的内容是UTF-8的形式编码的
  //解决办法就是告诉浏览器发送内容的编码方式
  const product = [
    {
     name:'苹果',
     id:1
    },
    {
     name:'香蕉',
     id:2
    },
    {
     name:'芒果',
     id:3
    }
  ];
//启动服务器，绑定端口号
server.listen(3000,function(){
  console.log('服务器启动成功');
})
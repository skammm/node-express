  //require不仅能加载具名核心模块
  //还能加载用户自己编写的模块
  //node没有全局作用域，只有模块作用域
  var fs = require('fs');
 
  fs.readFile('hello.txt',function(error,data){
    console.log(data.toString());
  })
  fs.writeFile('hello.txt','这是我通过写入写入的文件内容',function(error){
    console.log('写入成功')
  })

  
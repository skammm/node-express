  

  //npm install art-template
  var template = require('art-template');
  var fs = require('fs');

  fs.readFile('./tpl.html',function(err,data){
    if(err){
      console.log('读不到文件');
      return;
    }
    //data默认是二进制数据，render方法需要接受字符串
    var ret = template.render(data.toString(),{
      name:'jack',
      age:23,
      hobbies:['读书','画画','写字']
    })
    console.log(ret);
  })
  


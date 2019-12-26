// npm install --global nodemon
//  使用这个插件，可以监视文件变化，自动重启服务器
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

//通过express来使用模板
app.engine('html', require('express-art-template'));
//请求静态资源文件
app.use('/lib/', express.static('./lib/'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
app.get('/', function (req, res) {
  res.render('index.html', {
     comments:comments
  });
});


app.get('/post', function (req, res) {
  res.render('post.html');
});
//为post请求指定处理函数
//在express中没有内置获取请求体的API，需要安装 npm install body-parser第三方包来获取
app.post('/post', function (req, res) {
  var comment = req.body;
  comment.date = '2020-1-1';
  comments.unshift(comment);
  res.redirect('/');
});




app.listen(3000,function(){
  console.log('启动服务器')
})
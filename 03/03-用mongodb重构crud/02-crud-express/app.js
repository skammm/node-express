var express = require('express')
var app = express()
var router = require('./router.js')
var bodyParser = require('body-parser')
app.engine('html', require('express-art-template'));

app.use('/public/',express.static('./public/'));

app.use('/node_modules/',express.static('./node_modules/'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router);





app.listen(3000,function(){
  console.log('running.....')
})
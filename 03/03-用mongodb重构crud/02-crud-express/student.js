/**
 * 用mongodb数据库来存储数据
 * mongoose.model('Student',studentSchema)这个表达式返回Student
 * 设计好数据库后，router文件夹中用的是mongoose提供的API来操作数据库
 */

var mongoose = require('mongoose');
//链接到crud这个数据库
mongoose.connect('mongodb://localhost/crud',{ useNewUrlParser: true });
//设计文档结构
var Schema = mongoose.Schema;

var studentSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  hobbies:{
    type:String
  }
})
//导出模型构造函数，集合名为‘students’
module.exports = mongoose.model('Student',studentSchema)
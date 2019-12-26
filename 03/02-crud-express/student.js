/**
 * 用来完成对json文件的增删改查，处理数据逻辑
 */



/*
  获取所有学生列表
*/
var path = './db.json';
var fs = require('fs')
exports.find = function(callback){
  fs.readFile(path,function(err,data){
    if(err){
      return callback(err)
    }
    callback(null,JSON.parse(data.toString()).students)
  })
}
/**
 * 获取某个学生的个人信息
 * @param {Number} id
 * @param {Function} callback
 */
exports.findById = function(id,callback){
  fs.readFile(path,function(err,data){
    if(err){
      return callback(err)
    }
    var students = JSON.parse(data.toString()).students;
    var student = students.find(item=>{
      return item.id == parseInt(id);
    })
    callback(null,student);
  })
}

/*
  添加学生信息
*/
exports.add = function(student,callback){
  fs.readFile(path,function(err,data){
    if(err){
      return callback(err)
    }
    var students = JSON.parse(data.toString()).students;
    student.id = students[students.length-1].id+1;
    students.push(student);
    var ret = JSON.stringify({
      students:students
    })
    fs.writeFile(path,ret,function(err){
      if(err){
        return callback(err)
      }
      callback(null);
    })
  })
}

/*
  修改学生信息
 */
  exports.edit = function(student,callback){
    console.log(student)
    fs.readFile(path,function(err,data){
      if(err){
        return callback(err)
      }
      var students = JSON.parse(data.toString()).students;
      var editStu = students.find(item=>{
        return item.id == parseInt(student.id);
      })
      console.log(editStu)
      for(var key in student){
        editStu[key] = student[key];
      }
      var ret = JSON.stringify({
        students:students
      })
      fs.writeFile(path,ret,function(err){
        if(err){
          callback(err);
        }
      })
      callback(null)
    })
  }

  /**
   * 删除学生信息
   */
  exports.delete = function(id,callback){
    fs.readFile(path,function(err,data){
      if(err){
        return callback(err)
      }
      var students = JSON.parse(data.toString()).students;
      var index = students.findIndex(item=>{
        return item.id == parseInt(id);
      })
      students.splice(index,1);
      var ret = JSON.stringify({
        students:students
      })
      fs.writeFile(path,ret,function(err){
        if(err){
          callback(err);
        }
      })
      callback(null)
    })
  }
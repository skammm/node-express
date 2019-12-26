
/**
 * 路由映射表
 * get  /student
  get  /student/add
  post /student/add
  get  /student/edit
  post  /student/edit
  get   /student/delete
 * 
 
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');
var student = require('./student.js')
var image=['/public/img/x1.jpg','/public/img/x2.jpg','/public/img/x3.jpg','/public/img/x4.jpg']

router.get('/student', function (req, res) {
  student.find(function(err,data){
    if(err){
      return res.send(err)
    }
    res.render('index.html',{
      image:image,
      students:data
    })
  })
  
})

router.get('/student/add', function (req, res) {
  res.render('add.html',{
    image:image
  })
})

router.post('/student/add', function (req, res) {
  student.add(req.body,function(err){
    if(err){
      return res.send(err)
    }
    res.redirect('/student');
    
  })
})


router.get('/student/edit', function (req, res) {
  student.findById(req.query.id,function(err,data){
    if(err){
      return res.send(err);
    }
    res.render('edit.html',{
      student:data,
    })
  })
})


router.post('/student/edit', function (req, res) {
  var edit = req.body;
  student.edit(edit,function(err){
    if(err){
      return res.send(err);
    }
    res.redirect('/student')
  })
})


router.get('/student/delete', function (req, res) {
  student.delete(req.query.id,function(err){
    if(err){
      return res.send(err)
    }
    res.redirect('/student')
  })
})

module.exports = router;
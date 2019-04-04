const fs = require('fs')
const express = require('express')
const Student = require('./student-fs')
let router = express.Router()


// 主页渲染
router.get('/student', (req, res) => {
  Student.find((err, students) => {
    if(err) {
      return res.status(500).send('Server error')
    }
    res.render('index.html', {
      students: students
    })
  })
})


// 添加页渲染
router.get('/student/new', (req, res) => {
  res.render('new.html')
})


// 添加学生
router.post('/student/new', (req, res) => {
  // 1. 获取表单数据
  // 2. 处理

  new Student(req.body).save(err => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/student')
  })
})


// 编辑页渲染
router.get('/student/edit', (req, res) => {
  // 获取对应id
  Student.findById((req.query.id).replace(/"/g, ''), (err, student) => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('edit.html', {
      student: student
    })
  })
})


// 编辑
router.post('/student/edit', (req, res) => {
  // 获取表单提交数据
  let student = req.body
  Student.findByIdAndUpdate((student.id).replace(/"/g, ''), student, err => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/student')
  })
})


// 删除
router.get('/student/delete', (req, res) => {
  let id = (req.query.id).replace(/"/g, '')
  Student.findByIdAndRemove(id, err => {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/student')
  })
})

module.exports = router
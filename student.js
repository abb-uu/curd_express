let dbPath = './db.json'
const fs = require('fs')
/**
 * 获取所有学生列表
 */
exports.find = callback => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}

/**
 * 获取单个学生信息
 */
exports.findById = (id, callback) => {
  // 读取数据
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    // 转换为对象
    let students = JSON.parse(data).students
    // 获取对应id的学生信息
    let student = students.find(item => item.id === id)
    callback(null, student)
  })
}

/**
 * 添加保存学生
 */
exports.save = (student, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    // 获取学生数组
    let students = JSON.parse(data).students
    // 设置添加的学生 id
    student.id = students[students.length - 1].id + 1
    // 添加到学生数组中
    students.push(student)
    // 再转换为字符串
    let fileData = JSON.stringify({
      students: students
    })
    // 写入文件
    fs.writeFile(dbPath, fileData, err => {
      if (err) {
        // 错误将错误对象传递出去
        return callback(err)
      }
      callback(null)
    })
  })
}

/**
 * 更新学生
 */

exports.updateById = (student, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    // 获取学生数组
    let students = JSON.parse(data).students
    student.id = parseInt(student.id)
    // 获取对应id的学生信息
    let stu = students.find(item => item.id === student.id)
    // 循环更改对应信息
    for (let k in student) {
      stu[k] = student[k]
    }
    let fileData = JSON.stringify({
      students: students
    })
    // 重新写入
    fs.writeFile(dbPath, fileData, err => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}


/**
 * 删除学生
 */

 exports.deleteById = (id, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    // 获取学生数组
    let students = JSON.parse(data).students
    // 获取对应id的学生信息
    students = students.filter(item => +item.id !== +id)
    // 循环更改对应信息
    let fileData = JSON.stringify({
      students: students
    })
    // 重新写入
    fs.writeFile(dbPath, fileData, err => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
 }
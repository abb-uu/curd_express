let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student', {useNewUrlParser: true});
let Schema = mongoose.Schema
let studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  age: {
    type: Number,
    required: true
  },
  hobbies: {
    type: String,
  }
})
module.exports = mongoose.model('Student', studentSchema)
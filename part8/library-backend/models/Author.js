const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
  booksCount: {
    type: Number,
    required: true,
  },
})

schema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Author', schema)

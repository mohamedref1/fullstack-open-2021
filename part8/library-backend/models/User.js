const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  favoriteGenre: {
    type: String,
  },
})

schema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('User', schema)

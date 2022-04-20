const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author',
  },
  genres: [
    {
      type: String,
    },
  ],
})

schema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Book', schema)

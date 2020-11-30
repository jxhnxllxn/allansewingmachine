const mongoose = require('mongoose')

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 1000,
  },
  image: {
    type: String,
    default: 'noImage.jpg',
    maxlength: 1000,
  },
})

module.exports = mongoose.model('Brand', brandSchema)

const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [1, 'Collection name must be unique'],
    maxlength: 100,
  },
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Collection',
  },
})

module.exports = mongoose.model('Category', categorySchema)

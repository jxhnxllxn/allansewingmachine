const mongoose = require('mongoose')

const categoriesSchema = mongoose.Schema(
  {
    title: { type: String },
  },
  {
    timestamps: true,
  }
)

const collectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Collection name is required'],
    unique: [1, 'Collection name must be unique'],
    maxlength: 100,
  },

  images: {
    type: String,
    default: 'noImage.jpg',
  },
  categories: [categoriesSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Collection', collectionSchema)

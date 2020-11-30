const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema(
  {
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
  },
  //virtual
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Cascade delete category and product when a collection is deleted
collectionSchema.pre('remove', async function (next) {
  console.log(`Category and Product being removed from collection ${this._id}`)
  await this.model('Category').deleteMany({ collectionId: this._id })
  await this.model('Product').deleteMany({ collectionId: this._id })
  next()
})

// Reverse populate with virtuals
collectionSchema.virtual('categories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'collectionId',
  justOne: false,
})

module.exports = mongoose.model('Collection', collectionSchema)

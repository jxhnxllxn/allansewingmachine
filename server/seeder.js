const users = require('./data/user')
const products = require('./data/product')
const collections = require('./data/collection')
const brands = require('./data/brand')
const categories = require('./data/category')
const connectDB = require('./config/db')

const User = require('./models/User.model')
const Product = require('./models/Product.model')
const Order = require('./models/Order.model')
const Collection = require('./models/Collection.model')
const Brand = require('./models/Brand.model')
const Category = require('./models/Category.model')
require('./config/config')
require('dotenv')

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await Collection.deleteMany()
    await User.deleteMany()
    await Brand.deleteMany()

    const createdBrands = await Brand.insertMany(brands)
    const createdUsers = await User.insertMany(users)
    const createCollections = await Collection.insertMany(collections)

    const collectionId = createCollections[0]._id

    const sampleCategory = categories.map((i) => {
      return { ...i, collectionId }
    })

    const createdCategory = await Category.insertMany(sampleCategory)
    const categoryId = createdCategory[0]._id
    const brandId = createdBrands[0]._id

    const adminUser = createdUsers[0]._id

    const sampleProduct = products.map((i) => {
      return { ...i, user: adminUser, collectionId, categoryId, brandId }
    })

    await Product.insertMany(sampleProduct)

    console.log('Data Imported')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await Collection.deleteMany()
    await User.deleteMany()
    await Brand.deleteMany()
    await Category.deleteMany()

    console.log('Data destroyed')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}

const dotenv = require('dotenv')
const users = require('./data/user')
const products = require('./data/product')
const collections = require('./data/collection')
const connectDB = require('./config/db');

const User = require('./models/User.model')
const Product = require('./models/Product.model')
const Order = require('./models/Order.model')
const Collection = require('./models/Collection.model')


require('./config/config')

connectDB();

const importData = async() => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await Collection.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const createCollections = await Collection.insertMany(collections)

        const collectionId = createCollections[0]._id



        const adminUser = createdUsers[0]._id

        const sampleProduct = products.map(product => {
            return {...product, user: adminUser, collectionId}
        })

        await Product.insertMany(sampleProduct)

        console.log('Data Imported')
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const destroyData = async() => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await Collection.deleteMany()
        await User.deleteMany()

        console.log('Data destroyed')
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}

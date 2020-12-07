const express = require('express')

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsToShop,
  getProductToHome,
} = require('../controllers/product.controller')
const advanceResults = require('../middlewares/advaceResult.middleware')
const Product = require('../models/Product.model')

const router = express.Router({ mergeParams: true })

const { protect, admin } = require('../middlewares/auth.middleware')

router
  .route('/')
  .get(advanceResults(Product, ['collections', 'category']), getProducts)
  .post(protect, admin, addProduct)

router.route('/shop').post(getProductsToShop)

router.route('/home').get(getProductToHome)

router
  .route('/:id')
  .get(getProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)

module.exports = router

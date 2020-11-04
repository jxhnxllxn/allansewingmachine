const express = require('express');

const {getProducts, getProduct, addProduct, updateProduct, deleteProduct, getProductsToShop, getProductToHome} = require('../controllers/product.controller');
const advanceResults = require('../middlewares/advaceResult.middleware');
const Product = require('../models/Product.model')

const router = express.Router({mergeParams:true});

const {protect,authorize} = require('../middlewares/auth.middleware');

router.route('/')
    .get(advanceResults(Product,['collections','category']),getProducts)
    .post(protect,authorize('admin'),addProduct)
    

router.route('/shop')
    .post(getProductsToShop)

router.route('/home')
    .get(getProductToHome)

router.route('/:id')
    .get(getProduct)
    .put(protect,authorize('admin'),updateProduct)
    .delete(protect,authorize('admin'),deleteProduct)

module.exports = router;
const express = require('express');

const {getProducts, getProduct, addProduct, updateProduct, deleteProduct} = require('../../controllers/product/product.controller');

const router = express.Router({mergeParams:true});

const {protect,authorize} = require('../../middlewares/auth.middleware');

router.route('/')
    .get(getProducts)
    .post(protect,authorize('admin'),addProduct)

router.route('/:id')
    .get(getProduct)
    .put(protect,authorize('admin'),updateProduct)
    .delete(protect,authorize('admin'),deleteProduct)

module.exports = router;
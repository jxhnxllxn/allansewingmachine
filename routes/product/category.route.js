const express = require('express');

const {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
  } = require('../../controllers/product/category.controller');

const Category = require('../../models/product/Category.model');
const advanceResults = require('../../middlewares/advaceResult.middleware');

// Includes other resources routers
// const productRouter = require('../../routes/product/product.route');

const router = express.Router({mergeParams:true});
const {protect,authorize} = require('../../middlewares/auth.middleware');

//Re-routes other resource routers
// router.use('/:categoryId/product',productRouter)

// router.use('/:collectionId/category',categoryRouter)

router
  .route('/')
  .get(advanceResults(Category,['collections']),getCategories)
  .post(protect,authorize('admin'),addCategory);

router
    .route('/:id')
    .get(getCategory)
    .put(protect,authorize('admin'),updateCategory)
    .delete(protect,authorize('admin'),deleteCategory)

module.exports = router;
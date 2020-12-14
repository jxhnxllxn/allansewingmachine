const express = require('express')

const {
  getCategories,
  addCategory,
} = require('../controllers/category.controller')

const Category = require('../models/Category.model')
const advanceResults = require('../middlewares/advaceResult.middleware')

const router = express.Router()

const { protect, authorize } = require('../middlewares/auth.middleware')

router
  .route('/')
  .get(getCategories)
  .post(protect, authorize('admin'), addCategory)

module.exports = router

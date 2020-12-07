const express = require('express')

const {
  getCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
} = require('../controllers/collection.controller')

const Collection = require('../models/Collection.model')
const advanceResults = require('../middlewares/advaceResult.middleware')

const router = express.Router()

const { protect, admin } = require('../middlewares/auth.middleware')

router
  .route('/')
  .get(advanceResults(Collection, ['categories']), getCollections)
  .post(protect, admin, createCollection)

router
  .route('/:id')
  .get(getCollection)
  .put(protect, admin, updateCollection)
  .delete(protect, admin, deleteCollection)

module.exports = router

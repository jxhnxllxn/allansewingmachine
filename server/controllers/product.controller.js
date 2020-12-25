const errorResponse = require('../utils/errorResponse.util')
const asyncHandler = require('express-async-handler')
const Product = require('../models/Product.model')
const Collection = require('../models/Collection.model')

// @desc    get products to homepage
// @route   GET /api/products/productsToHome
// @access  Public

exports.getProductToHome = asyncHandler(async (req, res, next) => {
  const bestSeller = await Product.find({}).sort({ sold: -1 }).limit(8)
  res.status(200).json({
    success: true,
    data: bestSeller,
  })
})

// @desc    get product to shop
// @route   GET /api/products/
// @route   GET /api/category/:categoryId/products
// @access  Public
exports.getProductsToShop = asyncHandler(async (req, res, next) => {
  let order = req.body.order ? req.body.order : 'desc'
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id'
  let limit = req.body.limit ? parseInt(req.body.limit) : 90
  let skip = parseInt(req.body.skip)
  let findArgs = {}

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $lte: req.body.filters[key][1],
          $gte: req.body.filters[key][0],
        }
      } else if (key === 'collection') {
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }

  const collection = await Collection.findOne({ slug: req.body.collection })

  if (collection) {
    findArgs['collectionId'] = collection._id
  }

  findArgs['publish'] = true

  const data = await Product.find(findArgs)
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)

  res.status(200).json({
    size: data.length,
    articles: data,
  })
})

// @desc    get all Products
// @route   GET /api/products
// @route   GET /api//products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advanceResults)
})

// @desc    get single Products
// @route   GET /api/products/:id
// @access  Private

exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate({
    path: 'collectionId',
    select: 'name',
  })
  if (!product) {
    return next(
      new errorResponse(`No product with the id of ${req.params.id}`),
      404
    )
  }
  res.status(200).json(product)
})

// @desc    Add Products
// @route   GET /api/category/:categoryI d/products
// @access  Private

exports.addProduct = asyncHandler(async (req, res, next) => {
  req.body.category = req.params.categoryId
  req.body.collection = req.params.collectionId

  const category = await Category.findById(req.params.categoryId)
  const collection = await Collection.findById(req.params.collectionId)

  if (!category) {
    return next(
      new errorResponse(`No Category  with the id of ${req.params.categoryId}`),
      404
    )
  }
  if (!collection) {
    return next(
      new errorResponse(
        `No Collection  with the id of ${req.params.collectionId}`
      ),
      404
    )
  }

  const product = await Product.create(req.body)

  res.status(200).json({
    success: true,
    data: product,
  })
})

// @desc   Update Product
// @route   GET /api/category/:categoryId/products
// @access  Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let category = await Product.findById(req.params.id)

  if (!category) {
    return next(
      new errorResponse(`No category with the id of ${req.params.id}`),
      404
    )
  }

  category = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: category,
  })
})

// @desc    Delete Product
// @route   GET /api/category/:categoryId/products
// @access  Private

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const category = await Product.findById(req.params.id)

  if (!category) {
    return next(
      new errorResponse(`No category with the id of ${req.params.id}`),
      404
    )
  }

  await category.remove()

  res.status(200).json({
    success: true,
    data: category,
  })
})

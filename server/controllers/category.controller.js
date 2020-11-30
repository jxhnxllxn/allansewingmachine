const path = require('path')
const errorResponse = require('../utils/errorResponse.util')
const asyncHandler = require('express-async-handler')
const Category = require('../models/Category.model')
const fs = require('fs')

// @desc    get all Categories
// @route   GET /api/Categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res, next) => {
  const data = await Category.find({})

  res.status(200).json({
    data: data,
    success: true,
  })
})

exports.addCategory = asyncHandler(async (req, res, next) => {
  const data = await Category.create(req.body)
  res.status(200).json({
    data: data,
    success: true,
  })
})

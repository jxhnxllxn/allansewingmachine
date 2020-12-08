const crypto = require('crypto')
const errorResponse = require('../utils/errorResponse.util')
const asyncHandler = require('express-async-handler')
const sendMail = require('../utils/sendEmail.util')
const sendTokenResponse = require('../utils/sendTokenResponse.util')
const User = require('../models/User.model')
const cloudinary = require('cloudinary')
const fs = require('fs')

// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  //Validate email and password
  if (!email || !password) {
    return next(new errorResponse('Please provide an email and password', 404))
  }

  //Check for user
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new errorResponse('Invalid credentials', 401))
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return next(new errorResponse('Invalid credentials', 401))
  }

  sendTokenResponse(user, 200, res)
})

// @desc    Get current logged in user
// @route   POST /api/auth/me
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('orders')
  if (user) {
    sendTokenResponse(user, 200, res)
  } else {
    return next(new errorResponse('User not found', 404))
  }
})

// @desc    Create User
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const {
    name,
    email,
    contact,
    unit,
    street,
    country,
    state,
    zipcode,
    city,
    password,
  } = req.body

  const userExist = await User.findOne({ email })

  if (userExist) {
    return next(new errorResponse('User already exists', 400))
  }

  const user = await User.create({
    name,
    email,
    contact,
    address: {
      unit,
      street,
      country,
      state,
      zipcode,
      city,
    },
    password,
  })

  sendTokenResponse(user, 200, res)
})

// @desc    Get current logged out clear cookies
// @route   POST /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc    Update user detail
// @route   PUT /api/auth/updatedetail
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    address: {
      unit: req.body.unit,
      street: req.body.street,
      country: req.body.country,
      state: req.body.state,
      zipcode: req.body.zipcode,
      city: req.body.city,
    },
  }

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  })

  sendTokenResponse(user, 200, res)
})

// @desc    Update user detail
// @route   GET /api/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')
  //Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new errorResponse('Password is incorrect', 401))
  }

  user.password = req.body.newPassword
  await user.save()

  sendTokenResponse(user, 200, res)
})

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new errorResponse('There is no user with that email', 404))
  }

  //Reset token
  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  //Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/auth/resetpassword/${resetToken}`

  const message = `You receiving this email because you (or someone else) has requested the reset of password.
     Please make a PUT request to: \n\n ${resetUrl}`

  try {
    await sendMail({
      email: user.email,
      subject: 'Password reset',
      message,
    })
    res.status(200).json({ success: true, data: 'Email sent' })
  } catch (err) {
    console.log(err)
    user.getResetPasswordToken = undefined
    user.getResetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })
    return next(new errorResponse('Email could not be sent', 500))
  }
  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc    Reset Password
// @route   POST /api/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //Get hash token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(new errorResponse('Invalid token', 400))
  }

  //Set new Password
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()

  sendTokenResponse(user, 200, res)
})

exports.uploadimage = (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res
        .status(400)
        .json({ success: false, data: 'No files were uploaded.' })

    const file = req.files.file
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath)
      return res
        .status(400)
        .json({ success: false, data: 'Size too large make it lower than 1mb' })
    } //1mb max

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath)
      return res.status(400).json({ success: false, data: 'Not an image' })
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: 'allansewingmachine' },
      async (err, result) => {
        if (err) throw err
        removeTmp(file.tempFilePath)
        res.json({ public_id: result.public_id, url: result.secure_url })
      }
    )
  } catch (err) {
    return res.status(500).json({ success: false, data: err.message })
  }
}

exports.deleteimage = (req, res) => {
  try {
    const { public_id } = req.body
    if (!public_id)
      return res.status(400).json({ success: false, data: 'No image selected' })

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err
      res.json({ success: true, data: 'Image deleted' })
    })
  } catch (err) {
    return res.status(500).json({ success: false, data: err.message })
  }
}

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err
  })
}

const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const ErrorResponse = require('../utils/errorResponse.util')
const User = require('../models/User.model')

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.token) {
    token = req.cookies.token
  }

  //Make  sure token exist
  if (!token) {
    return next(new ErrorResponse('Not authorized, no token', 401))
  }

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded);
    req.user = await User.findById(decoded.id).select('-password')

    const userData = await User.findById(decoded.id).select('-password')
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new ErrorResponse('Session timed out.', 403))
    } else if (error.name === 'JsonWebTokenError') {
      return next(new ErrorResponse('Invalid Token.', 401))
    } else {
      return next(new ErrorResponse({ error }, 400))
    }
  }
})

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      )
    }
    next()
  }
}

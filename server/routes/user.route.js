const express = require('express')
const {
  register,
  login,
  logout,
  getUserProfile,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  uploadimage,
  deleteimage,
  getAllUser,
} = require('../controllers/user.controller')

const router = express.Router()

const { protect, authorize } = require('../middlewares/auth.middleware')
const advanceResults = require('../middlewares/advaceResult.middleware')
const UserModel = require('../models/User.model')

router.route('/').post(register).get(advanceResults(UserModel), getAllUser)
//getAllUsers

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateDetails)

router.post('/login', login)
router.get('/logout', logout)

router.post('/uploadimage', protect, authorize('admin'), uploadimage)
router.post('/deleteimage', protect, authorize('admin'), deleteimage)

router.route('/password').post(forgotPassword).put(protect, updatePassword)

router.put('/resetpassword/:resettoken', resetPassword)

module.exports = router

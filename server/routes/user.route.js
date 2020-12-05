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
} = require('../controllers/user.controller')

const router = express.Router()

const { protect, authorize } = require('../middlewares/auth.middleware')

router.post('/register', register)
router.post('/login', login)
router.get('/profile', protect, getUserProfile)
router.get('/logout', logout)

router.post('/uploadimage', protect, authorize('admin'), uploadimage)
router.post('/deleteimage', protect, authorize('admin'), deleteimage)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword)
router.put('/updatedetail/', protect, updateDetails)
router.put('/updatepassword/', protect, updatePassword)

module.exports = router

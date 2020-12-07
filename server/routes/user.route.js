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

const { protect, admin } = require('../middlewares/auth.middleware')

router.route('/').post(register)
//getAllUsers

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateDetails)

router.post('/login', login)
router.get('/logout', logout)

router.post('/uploadimage', protect, admin, uploadimage)
router.post('/deleteimage', protect, admin, deleteimage)

router.route('/password').post(forgotPassword).put(protect, updatePassword)

router.put('/resetpassword/:resettoken', resetPassword)

module.exports = router

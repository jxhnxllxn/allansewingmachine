const express = require('express');
const { 
    register,
    login,
    logout,
    getMe,
    forgotPassword,
    resetPassword,
    updateDetails,
    updatePassword,
    uploadimage,
    deleteimage
    } = require('../controllers/auth.controller');

const router = express.Router();

const {protect, authorize} = require('../middlewares/auth.middleware')


router.post('/register',register);
router.post('/login',login);
router.get('/me',protect,getMe);
router.get('/logout',logout);

router.post('/uploadimage',protect,authorize('admin'),uploadimage);
router.post('/deleteimage',protect,authorize('admin'),deleteimage)
router.post('/forgotpassword',forgotPassword);
router.put('/resetpassword/:resettoken',resetPassword);
router.put('/updatedetail/',protect,updateDetails);
router.put('/updatepassword/',protect,updatePassword);


module.exports = router;
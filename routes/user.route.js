const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user.controller')


const User = require('../models/User.model');
const router = express.Router();

const advanceResults = require('../middlewares/advaceResult.middleware');
const {protect,authorize} = require('../middlewares/auth.middleware');

router.use(protect);
router.use(authorize('admin'))

router.route('/')
    .get(
        advanceResults(User,{
            path:'orders',
            select:'product'
        }),
        getUsers
    )   
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router

module.exports = router;

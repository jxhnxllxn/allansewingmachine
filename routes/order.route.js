const express = require('express');

const {getOrders, getOrder, addOrder, updateOrder, deleteOrder} = require('../controllers/order.controller');

const router = express.Router({mergeParams:true});

const {protect} = require('../middlewares/auth.middleware');

router.route('/')
    .get(getOrders)
    .post(protect,addOrder)

router.route('/:id')
    .get(getOrder)
    .put(protect,updateOrder)
    .delete(protect,deleteOrder)

module.exports = router;
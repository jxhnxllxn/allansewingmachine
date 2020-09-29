const express = require('express');

const {getOrders, getOrder, addOrder, updateOrder, deleteOrder, dashboardAdmin, searchIndex, getOrderHistory} = require('../controllers/order.controller');
const advanceResults = require('../middlewares/advaceResult.middleware');
const Order = require('../models/Order.model')


const router = express.Router({mergeParams:true});

const {protect,authorize} = require('../middlewares/auth.middleware');


    router.route('/')
    .get(protect,authorize('admin'),advanceResults(Order,['user']),getOrders)
    .post(protect,addOrder);

    
    router.route('/search/:i')
    .get(protect,authorize('admin'),searchIndex);

    router.route('/dashboard')
    .get(protect,authorize('admin'),dashboardAdmin);

    
    router.route('/order-history')
    .get(protect,getOrderHistory);

    router.route('/:id')
    .get(protect,authorize('admin'),getOrder)
    .put(protect,updateOrder)
    .delete(protect,deleteOrder);


module.exports = router;
const errorResponse = require('../utils/errorResponse.util');
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order.model');
const Product = require('../models/Product.model');

const async = require('async');

exports.searchIndex = asyncHandler(async (req, res, next) => {

    const result = await Order.find(
        {
            "$or": [
                { "name": { $regex: new RegExp(req.params.i, 'i') } },
                { "status": { $regex: new RegExp(req.params.i, 'i') } },
                { "total": { $regex: new RegExp(req.params.i, 'i') } },

            ]
        },
        {
            __v: 0
        }
    )

    res.status(200).json({
        success: true,
        count: result.length,
        data: result
    })

});

// @desc    get all Orders
// @route   GET /api/orders
// @route   GET /api/order/:orderId/orders
// @access  Private

exports.dashboardAdmin = asyncHandler(async (req, res, next) => {
    const pending = await Order.find({ status: 'pending' }).countDocuments()
    const canceled = await Order.find({ status: 'canceled' }).countDocuments()
    const processed = await Order.find({ status: 'processed' }).countDocuments()
    const all = await Order.find().countDocuments()

    res.status(200).json({
        success: true,
        count: {
            pending: pending,
            canceled: canceled,
            processed: processed,
            all: all
        }
    })
});


exports.getOrders = asyncHandler(async (req, res, next) => {

    res
        .status(200)
        .json(res.advanceResults);

});



// @desc    get single Orders
// @route   GET /api/orders/:id
// @access  Private

exports.getOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate({
        path: 'user',
        select: 'name email address contact'
    });

    if (!order) {
        return next(new errorResponse(`No order with the id of ${req.params.id}`), 404);
    }
    res.status(200).json({
        success: true,
        data: order
    })
});


exports.getOrderHistory = asyncHandler(async (req, res, next) => {
    const order = await Order.find(
        { user: req.user._id })


    if (!order) {
        return next(new errorResponse(`No order with the id of ${req.user._id}`), 404);
    }
    res.status(200).json({
        success: true,
        data: order
    })
});




// @desc    Add Orders
// @route   GET /api/order/:orderId/orders
// @access  Private

exports.addOrder = (req, res, next) => {
    req.body.user = req.user.id;
    console.log(req.user)
    let orderDetail = {
        user: req.user._id,
        name: req.user.name,
        paymentId: req.body.paymentData.paymentID,
        product: req.body.orderDetail.orders,
        additionalInfo: req.body.orderDetail.additionalInfo,
        shipping: req.body.orderDetail.shipping,
        total: req.body.orderDetail.total
    }
    // let order = await Order.findById(req.params.id);
    // //Make sure user is ordered owner
    // if(order.user.toString() !== req.user.id && req.user.role === 'admin'){
    //     return next(
    //         new errorResponse(`User ${req.params.id} is not authorized to add this order`,401)
    //     );
    // }

    //to be continued
    Order.create(orderDetail, (err, order) => {
        if (err) return res.json({ success: false, data: err });
        let products = [];
        order.product.forEach(item => {
            products.push({ id: item._id, quantity: item.quantity, available: item.available })
        })

        async.eachSeries(products, (item, callback) => {
            Product.updateMany(
                { _id: item.id },
                {
                    $inc: {
                        "sold": item.quantity,
                        "available": -item.quantity
                    },
                },
                { new: false },
                callback
            )
        }, (err) => {
            if (err) return res.json({ success: false, data: err });
            // sendEmail(user.email,user.name,null,"purchase",transactionData)
            res.status(200).json({
                success: true,
            })
        })
    });

};

// @desc   Update Order
// @route   GET /api/order/:orderId/orders
// @access  Private

exports.updateOrder = asyncHandler(async (req, res, next) => {

    let order = await Order.findById(req.params.id);

    if (!order) {
        return next(
            new errorResponse(`No order with the id of ${req.params.id}`),
            404
        );
    }

    //Make sure user is ordered owner
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new errorResponse(`User ${req.params.id} is not authorized to update this order`, 401)
        );
    }

    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: order
    })
});


// @desc    Delete Order
// @route   GET /api/order/:orderId/orders
// @access  Private

exports.deleteOrder = asyncHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(
            new errorResponse(`No order with the id of ${req.params.id}`),
            404
        );
    }

    //Make sure user is ordered owner
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new errorResponse(`User ${req.params.id} is not authorized to delete this order`, 401)
        );
    }

    await order.remove();

    res.status(200).json({
        success: true,
        data: order
    })
});



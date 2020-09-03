const errorResponse = require('../utils/errorResponse.util');
const asyncHandler = require('../middlewares/async.middleware');
const Order = require('../models/Order.model');

// @desc    get all Orders
// @route   GET /api/v1/orders
// @route   GET /api/v1/order/:orderId/orders
// @access  Private

exports.getOrders = asyncHandler(async (req,res,next) => {
    let query;

    if(req.params.orderId){
        query = Order.find({ order:req.params.orderId })
        // console.log({orderOwne:req.params.orderId});
    }else{
        query = Order.find().populate({
            path:'order',
            select:'orderName'
        });
    }

    const orders = await query;

    res.status(200).json({
        success:true,
        count:orders.length,
        data:orders
    })
});



// @desc    get single Orders
// @route   GET /api/v1/orders/:id
// @access  Private

exports.getOrder = asyncHandler(async (req,res,next) => {
   const order = await Order.findById(req.params.id).populate({
       path:'order',
       select:'name email'
   });

   if(!order){
       return next(new errorResponse(`No order with the id of ${req.params.id}`),404);
   }
    res.status(200).json({
        success:true,
        data:order
    })
});


// @desc    Add Orders
// @route   GET /api/v1/order/:orderId/orders
// @access  Private

exports.addOrder = asyncHandler(async (req,res,next) => {
    req.body.user = req.user.id;

    //to be continued
    // let order = await Order.findById(req.params.id);


    const order = await Order.create(req.body);
    
    //Make sure user is ordered owner
    if(order.user.toString() !== req.user.id && req.user.role !== 'admin'){
        return next(
            new errorResponse(`User ${req.params.id} is not authorized to add this order`,401)
        );
    }

     res.status(200).json({
         success:true,
         data:order
     })
 });

// @desc   Update Order
// @route   GET /api/v1/order/:orderId/orders
// @access  Private

exports.updateOrder = asyncHandler(async (req,res,next) => {

    let order = await Order.findById(req.params.id);

    if(!order){
        return next(
            new errorResponse(`No order with the id of ${req.params.id}`),
            404
        );
    }

    //Make sure user is ordered owner
    if(order.user.toString() !== req.user.id && req.user.role !== 'admin'){
        return next(
            new errorResponse(`User ${req.params.id} is not authorized to update this order`,401)
        );
    }

    order = await Order.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true
    });

     res.status(200).json({
         success:true,
         data:order
     })
 });
 
 
// @desc    Delete Order
// @route   GET /api/v1/order/:orderId/orders
// @access  Private

exports.deleteOrder = asyncHandler(async (req,res,next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(
            new errorResponse(`No order with the id of ${req.params.id}`),
            404
        );
    }

    //Make sure user is ordered owner
    if(order.user.toString() !== req.user.id && req.user.role !== 'admin'){
        return next(
            new errorResponse(`User ${req.params.id} is not authorized to delete this order`,401)
        );
    }


    await order.remove();
    
     res.status(200).json({
         success:true,
         data:order
     })
 });



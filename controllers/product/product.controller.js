const errorResponse = require('../../utils/errorResponse.util');
const asyncHandler = require('../../middlewares/async.middleware');
const Product = require('../../models/product/Product.model');
const Category = require('../../models/product/Category.model');


// @desc    get product by arrival
// @route   GET /api/products
// @route   GET /api/category/:categoryId/products
// @access  Private
// exports.getProducts = asyncHandler(async (req,res,next) => {

// });

// @desc    get all Products
// @route   GET /api/products
// @route   GET /api/category/:categoryId/products
// @access  Private
exports.getProducts = asyncHandler(async (req,res,next) => {
    // let query;

    // if(req.params.categoryId){
    //     query = Product.find({ category:req.params.categoryId })
    //     // console.log({categoryOwne:req.params.categoryId});
    // }else{
    //     query = Product.find().populate({
    //         path:'category',
    //         select:'categoryName'
    //     });
    // }

    // const products = await query;

    // res.status(200).json({
    //     success:true,
    //     count:products.length,
    //     data:products
    // })

    res
        .status(200)
        .json(res.advanceResults);
});



// @desc    get single Products
// @route   GET /api/products/:id
// @access  Private

exports.getProduct = asyncHandler(async (req,res,next) => {
   const category = await Product.findById(req.params.id).populate({
       path:'category',
       select:'name email'
   });

   if(!category){
       return next(new errorResponse(`No category with the id of ${req.params.id}`),404);
   }
    res.status(200).json({
        success:true,
        data:category
    })
});


// @desc    Add Products
// @route   GET /api/category/:categoryId/products
// @access  Private

exports.addProduct = asyncHandler(async (req,res,next) => {
    // req.body.category = req.params.categoryId;

    // const category = await Category.findById(req.params.categoryId);

    // if(!category){
    //     return next(
    //         new errorResponse(`No Category  with the id of ${req.params.categoryId}`),
    //         404
    //     );
    // }

    const product = await Product.create(req.body);

     res.status(200).json({
         success:true,
         data:product
     })
 });
 
// @desc   Update Product
// @route   GET /api/category/:categoryId/products
// @access  Private

exports.updateProduct = asyncHandler(async (req,res,next) => {

    let category = await Product.findById(req.params.id);

    if(!category){
        return next(
            new errorResponse(`No category with the id of ${req.params.id}`),
            404
        );
    }

    category = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true
    });

     res.status(200).json({
         success:true,
         data:category
     })
 });
 
 
// @desc    Delete Product
// @route   GET /api/category/:categoryId/products
// @access  Private

exports.deleteProduct = asyncHandler(async (req,res,next) => {

    const category = await Product.findById(req.params.id);

    if(!category){
        return next(
            new errorResponse(`No category with the id of ${req.params.id}`),
            404
        );
    }

    await category.remove();
    
     res.status(200).json({
         success:true,
         data:category
     })
 });



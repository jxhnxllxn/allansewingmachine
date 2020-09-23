const errorResponse = require('../../utils/errorResponse.util');
const asyncHandler = require('../../middlewares/async.middleware');
const Product = require('../../models/product/Product.model');


// @desc    get product by arrival
// @route   GET /api/products
// @route   GET /api/category/:categoryId/products
// @access  Public
exports.getProductsToShop = asyncHandler(async (req,res,next) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $lte: req.body.filters[key][1],
                    $gte: req.body.filters[key][0]
                }
            }
            // else if(key === 'collections'){
            //     findArgs['collections'] = req.body.filters[key]
            // }
            else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    findArgs['publish'] = true;

    Product.
    find(findArgs).
    populate('collections').
    populate('category').
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
});

// @desc    get all Products
// @route   GET /api/products
// @route   GET /api//products
// @access  Public
exports.getProducts = asyncHandler(async (req,res,next) => {
    

    res
        .status(200)
        .json(res.advanceResults);
});



// @desc    get single Products
// @route   GET /api/products/:id
// @access  Private

exports.getProduct = asyncHandler(async (req,res,next) => {
   const product = await Product.findById(req.params.id)
   .populate({
       path:'category',
       select:'name email'
   })
   .populate({
    path:'collections',
    select:'name'
})
   ;

   if(!product){
       return next(new errorResponse(`No product with the id of ${req.params.id}`),404);
   }
    res.status(200).json({
        success:true,
        data:product
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



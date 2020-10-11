const errorResponse = require('../../utils/errorResponse.util');
const asyncHandler = require('express-async-handler');
const Category = require('../../models/product/Category.model');
const Collection = require('../../models/product/Collection.model');

// @desc    get all Categories
// @route   GET /api/v1/categories
// @route   GET /api/v1/collection/:collectionId/categories
// @access  Private

exports.getCategories = asyncHandler(async (req, res, next) => {

    if (req.params.collectionId) {
        const categories = await Category.find({ Collection: req.params.collectionId })
        return res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });

    } else {
        res.status(200).json(res.advanceResults);
    }

});



// @desc    get single Categories
// @route   GET /api/v1/categories/:id
// @access  Private

exports.getCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).populate({
        path: 'collections',
        select: 'collectionName'
    });

    if (!category) {
        return next(new errorResponse(`No category with the id of ${req.params.id}`), 404);
    }
    res.status(200).json({
        success: true,
        data: category
    })
});


// @desc    Add Categories
// @route   GET /api/v1/collection/:collectionId/categories
// @access  Private

exports.addCategory = asyncHandler(async (req, res, next) => {
    // req.body.collections = req.params.collectionId;

    // const collection = await Collection.findById(req.params.collectionId);

    // if(!collection){
    //     return next(
    //         new errorResponse(`No Collection with the id of ${req.params.id}`),
    //         404
    //     );
    // }

    const category = await Category.create(req.body);

    res.status(200).json({
        success: true,
        data: category
    })
});

// @desc   Update Category
// @route   GET /api/v1/collection/:collectionId/categories
// @access  Private

exports.updateCategory = asyncHandler(async (req, res, next) => {

    let category = await Category.findById(req.params.id);

    if (!category) {
        return next(
            new errorResponse(`No category with the id of ${req.params.id}`),
            404
        );
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: category
    })
});


// @desc    Delete Category
// @route   GET /api/v1/collection/:collectionId/categories
// @access  Private

exports.deleteCategory = asyncHandler(async (req, res, next) => {

    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(
            new errorResponse(`No category with the id of ${req.params.id}`),
            404
        );
    }

    await category.remove();

    res.status(200).json({
        success: true,
        data: category
    })
});



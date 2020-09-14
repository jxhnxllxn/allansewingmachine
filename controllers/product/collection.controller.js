const path = require('path');
const errorResponse = require('../../utils/errorResponse.util');
const asyncHandler = require('../../middlewares/async.middleware');
const Collection = require('../../models/product/Collection.model');
const fs = require('fs')

// @desc    get all Collection
// @route   GET /api/Collection
// @access  Private
exports.getCollections = asyncHandler (async (req,res,next)=>{

    res
        .status(200)
        .json(res.advanceResults);
   
});

// @desc    get single Collection
// @route   GET /api/Collection/:id
// @access  Private
exports.getCollection = asyncHandler (async (req, res, next)=>{
    const collection = await Collection.findById(req.params.id).populate('categories');

    if (!collection) {
      return next(
        new errorResponse(`Collection owner not found with ID of ${req.params.id}`, 404)
      );
    }
  
    res.status(200).json({ success: true, data: collection });
});

// @desc    update Collection
// @route   PUT /api/Collection/:id
// @access  Private
exports.updateCollection = asyncHandler (async (req,res,next)=>{

    const collection = await Collection.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });

    if(!collection){
        return next(new errorResponse(`Collection not found with ID of ${req.params.id}`,404));
    }

    res.status(200).json({success:true,data:collection});

});

// exports.updateCollectionPhoto = asyncHandler(async(req,res,next) => {
//   const collection = await Collection.findById(req.params.id);
//   if (!req.files || Object.keys(req.files).length === 0) {
//         return next(
//             new errorResponse('No files were uploaded', 404)
//         );
//     }
  
//     const file = req.files['file'];
//     // Make sure the image is a photo
//     if (!file.mimetype.startsWith('image')) {
//       return next(new errorResponse(`Please upload an image file`, 400));
//     }
  
//     // Check filesize
//     if (file.size > process.env.MAX_FILE_UPLOAD) {
//       return next(
//         new errorResponse(
//           `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
//           400
//         )
//       );
//     }
  
//     // Create custom filename
//     file.name = `photo_${new Date().getTime().toString()}${path.parse(file.name).ext}`;
  
//     file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
//       if (err) {
//         console.error(err);
//         return next(new errorResponse(`Problem with updating photo`, 500));
//       }

//     });

// });

// @desc    delete Collection
// @route   DELETE /api/collection/:id
// @access  Private
exports.deleteCollection = asyncHandler (async (req,res,next)=>{
    const collection = await Collection.findById(req.params.id);
  
    if(!collection){
        return next(new errorResponse(`Collection not found with ID of ${req.params.id}`,404));
    }

    fs.unlink(`${process.env.FILE_UPLOAD_PATH}/${collection.collectionPhoto}`, async err => {
      if (err) {
        console.error(err);
        return next(new errorResponse(`Problem with file deletion`, 500));
      }
      
      collection.remove();

      res
          .status(200)
          .json({success:true,data:collection});

    });

});



// @desc    create Collection
// @route   POST /api/Collection
// @access  Private
// exports.createCollection = asyncHandler (async (req,res,next)=>{
//   const collect = await Collection.create(req.body);
//   res
//       .status(201)
//       .json({success:true,data: collect})
// });

// @desc      Upload photo for collection
// @route     PUT /api/collection/:id/photo
// @access    Private
exports.createCollection = asyncHandler(async (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(
            new errorResponse('No files were uploaded', 404)
        );
    }
  
    const file = req.files['file'];
    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return next(new errorResponse(`Please upload an image file`, 400));
    }
  
    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new errorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }
  
    // Create custom filename
    file.name = `photo_${new Date().getTime().toString()}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return next(new errorResponse(`Problem with file upload`, 500));
      }
      const collect = await Collection.create({ collectionName:req.body.collectionName,collectionPhoto:file.name});
      console.log(collect)
      // await Collection.findByIdAndUpdate(req.params.id, { photo: file.name });
  
      res.status(200).json({
        success: true,
        data: collect
        // data: file.name
      });

    });
    
});  
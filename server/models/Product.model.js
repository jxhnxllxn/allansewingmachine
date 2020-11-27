const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
   {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
   },
   {
      timestamps: true,
   }
);

const productSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      collectionId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "Collection",
      },
      name: {
         type: String,
         required: [true, "Product Name is required"],
         unique: [1, "Prouduct name must be unique"],
         maxlength: 100,
      },
      machineType: {
         type: String,
         maxlength: 100,
      },
      description: {
         type: String,
         required: [true, "Description is required"],
         maxlength: 100000,
      },
      rating: {
         type: Number,
         required: true,
         default: 0,
      },
      numReviews: {
         type: Number,
         required: true,
         default: 0,
      },
      reviews: [reviewSchema],
      images: {
         type: Array,
         default: [],
      },
      price: {
         type: Number,
         required: [true, "Price is required"],
         maxlength: 255,
      },
      brand: {
         type: String,
         required: true,
      },
      condition: {
         type: String,
         enum: ["NEW", "USED"],
         default: "NEW",
      },
      category: {
         type: String,
         required: true,
      },
      stock: {
         type: Number,
         maxlength: 100,
         default: 0,
      },
      sold: {
         type: Number,
         maxlength: 100,
         default: 0,
      },
      publish: {
         required: true,
         type: Boolean,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

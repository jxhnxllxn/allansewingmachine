const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   
   productName:{
       type:String,
       required:[true,'Product Name is required']
   },
   description:{
       type:String,
       required:[true,'Description is required']
   },
   price:{
       type:String,
       required:[true,'Price is required']
   },
   prevPrice:{
       type:String,
       required:[true,'Prev Price is required']
   },
   createdAt:{
       type:Date,
       default:Date.now
   },
   category:{
       type: mongoose.Schema.ObjectId,
       ref :'Category',
       required:true,
   }
});

module.exports = mongoose.model('Product',productSchema);
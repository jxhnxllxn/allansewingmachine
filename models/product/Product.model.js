const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   
   productName:{
       type:String,
       required:[true,'Product Name is required'],
       unique: [1,'Prouduct name must be unique'],
       maxlength: 100
   },
   description:{
       type:String,
       required:[true,'Description is required'],
       maxlength:100000
   },
   unit:{
       type:String,
       required:[true, 'unit is required']
   },
   price:{
       type:String,
       required:[true,'Price is required'],
       maxlength:255
   },
   prevPrice:{
       type:String,
       required:[true,'Prev Price is required']
   },
   category:{
       type: mongoose.Schema.ObjectId,
       ref :'Category',
       required:true,
   },
   collections:{
       type:mongoose.Schema.ObjectId,
       ref: 'Collection',
       required:true,
   },
   shipping:{
       required:true,
       type: Boolean
   },
   available:{
       required:true,
       type:Boolean,
   },
   sold:{
       type:Number,
       maxlength:100,
       default:0
   }, 
   publish:{
        required:true,
        type:Boolean,
   },
    images:{
        type: Array,
        default:[]
    }
},{timestamps:true});

module.exports = mongoose.model('Product',productSchema);
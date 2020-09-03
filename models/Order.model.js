const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    overAllTotal:{
        type:Number,
    },
    product:[{
        name:{
            type:String,
            required:[true,'Order name is required']
        },
        quantity:{
            type:Number,
            required:[true,'Order quantity is required']
        },
        total:{
            type:Number,
            required:[true,'Order quantity is required']
        },
    }]
});

module.exports = mongoose.model('Order',orderSchema);
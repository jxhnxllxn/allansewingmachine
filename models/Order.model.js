const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    total:{
        required:[true, 'Make some orders'],
        type:Number,
    },
    additionalInfo:{
        type:String,
    },
    shipping:{
        type:String,
    },
    paymentOption:{
        type:String,
    },
    paymentId:{
        type:String,
    },
    product:[{
        name:{
            type:String,
            required:[true,'Product not available']
        },
        quantity:{
            type:Number,
            required:[true,'Make some orders']
        },
        available:{
            type:Number,
            required:[true,'Make some orders']
        },
        sold:{
            type:Number,
            required:[true,'Make some orders']
        }
    }],
    status:{
        type: String,
        enum: ['pending','canceled','doned'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Order',orderSchema);
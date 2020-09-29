const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:[true, 'Sorry something goes wrong'],
        
    },
    // email:{
    //     type:String,
    //     required:[true, 'Sorry something goes wrong']
    // },
    // address:{
    //     city:{
    //         type:String,
    //         default:''
    //     },
    //     country:{
    //         type:String,
    //         default:''
    //     },
    //     state:{
    //         type:String,
    //         default:''
    //     },
    //     street:{
    //         type:String,
    //         default:''
    //     },
    //     unit:{
    //         type:String,
    //         default:''
    //     },
    //     zipcode:{
    //         type:String,
    //         default:''
    //     }
    // },
    // contact:{
    //     type:String,
    //     required:[true, 'Sorry something goes wrong']
    // },
    total:{
        required:[true, 'Make some orders'],
        type:String
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
        _id:{
            type:String,
            required:[true,'Product not available']
        },
        name:{
            type:String,
            required:[true,'Product not available']
        },
        quantity:{
            type:Number,
            default:0,
            required:[true,'Make some orders']
        },
        price:{
            type:Number,
            default:0,
            required:[true,'Make some orders']
        },
        
    }],
    status:{
        type: String,
        enum: ['pending','canceled','doned'],
        default: 'pending',
        
    }
},
{timestamps:true}
);

module.exports = mongoose.model('Order',orderSchema);
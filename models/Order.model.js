const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Sorry something goes wrong'],

    },
    shippingAddress: {
        address: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        street: {
            type: String,
            default: ''
        },
        unit: {
            type: String,
            default: ''
        },
        zipcode: {
            type: String,
            default: ''
        }
    },
    additionalInfo: {
        type: String,
    },
    shippingMethod: {
        type: String,
    },
    paymentMethod: {
        type: String,
    },
    paymentResult: {
        id:{type:String},
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String},
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    shippinngPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    totalPrice:{
        type:Boolean,
        required:true,
        default:false
    },
    product: [{
        product: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'Product'
        },
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            default: 0,
            required: true,
        },
        price: {
            type: Number,
            default: 0,
            required: true,
        },

    }],
    status: {
        type: String,
        enum: ['pending', 'canceled', 'doned'],
        default: 'pending',
    },
    paidAt:{
        type:Date,
    },
    isDelivered:{
        type:Boolean,
        required:true,
        default:false,
    },
    deliveredAt:{
        type:Date
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
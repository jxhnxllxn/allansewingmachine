const mongoose = require('mongoose');

const DeliveredToSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Please enter your name'],
    },
    phone:{
        type:String,
        maxlength:[20,'Phone number can not be longer than 20 characters']
    },
    email:{
        type:String,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ],
    },
    address: {
        type: String,
        required:[true,'Please add an address']
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true,
          index: '2dsphere'
        },
        formatedAddress:String,
        street:String,
        city:String,
        state:String,
        zipcode:String,
        country:String,
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DeliveredTo',DeliveredToSchema);
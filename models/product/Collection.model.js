const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({

    
    name:{
       type:String,
       required:[true,'Collection name is required'],
       unique: [1,'Prouduct name must be unique'],
       maxlength: 100
    },
    
    images:{
        type: Array,
        default:[]
    },
    
    createdAt:{
        type:Date,
        default:Date.now
    }

},
//virtual 
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

// create stall slug from the name
// stallOwnerSchema.pre('save',function(next){
//     console.log('Slugify ran', this.name);
//     next();
// })

//Geocode & Create location field


//Cascade delete payments when collection deleted
collectionSchema.pre('remove',async function (next){
    console.log(`Category and Product have been removed from collection ${this._id}`);
    await this.model('Category').deleteMany({ collection:this._id });
    next();
});

//Reverse populate with virtual
collectionSchema.virtual('categories',{
    ref:'Category',
    localField:'_id',
    foreignField:'collections',
    justOne:false
});

module.exports = mongoose.model('Collection',collectionSchema);


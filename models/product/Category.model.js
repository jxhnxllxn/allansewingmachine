const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
   
   categoryName:{
       type:String,
       required:[true,'Product Category name is required']
   },
   categoryImage:{
       type:String,
       required:[true,'Product  Category Image is required']
   },
   createdAt:{
       type:Date,
       default:Date.now
   },
   collections:{
       type: mongoose.Schema.ObjectId,
       ref :'Collection',
       required:true,
   }
},
//virtual 
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});


//Cascade delete payments when collection deleted
categorySchema.pre('remove',async function (next){
    console.log(`Product have been removed from category ${this._id}`);
    await this.model('Product').deleteMany({ collection:this._id });
    next();
});

//Reverse populate with virtual
categorySchema.virtual('Products',{
    ref:'Product',
    localField:'_id',
    foreignField:'category',
    justOne:false
});

module.exports = mongoose.model('Category',categorySchema);
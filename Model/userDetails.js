const mongoose=require('mongoose');
const userModel = require('./user');
mongoose.connect('mongodb+srv://mongo_db_user:RAJEEV@cluster0-4o2hk.mongodb.net/flipcart?retryWrites=true&w=majority',{useNewUrlParser:true})
var UserDetailsSchema=new mongoose.Schema(

    {
        address:{
            type:String,
            required:true
        },
        
        product:[{type:mongoose.Schema.ObjectId,ref:'user'}],

        buyingBy:{
            type:String,
            required:true
        } ,
        totalCost:{
            type:Number,
            required:true
        },
        status:{
            type:Boolean,
            required:true
        },
        date:{
           type:Date,
           default:new Date() 

        }
        
        
    }
)
var product=mongoose.model('products',UserDetailsSchema);
module.exports=product
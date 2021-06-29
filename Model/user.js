const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://mongo_db_user:RAJEEV@cluster0-4o2hk.mongodb.net/flipcart?retryWrites=true&w=majority',{useNewUrlParser:true})
var con =mongoose.connection;
var UserSchema=new mongoose.Schema(

    {
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
      
        
    }
)


var userModel=mongoose.model('client',UserSchema);
module.exports=userModel
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://mongo_db_user:RAJEEV@cluster0-4o2hk.mongodb.net/Parallel?retryWrites=true&w=majority',{useNewUrlParser:true})
var con =mongoose.connection;
var blogSchema=new mongoose.Schema(

    {
        blogTitle:{
            type:String,

        },
       blogAuthor:{
            type:String,

        },
       blogDescription:{
            type:String,


        },
     
       blogImgUrl:{
            type:String,
           
        },
       blogTime:{
            type:String,
           
        },
     

    }
)


var blogModel=mongoose.model('blog',blogSchema);
module.exports=blogModel
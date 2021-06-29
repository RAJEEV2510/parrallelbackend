const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const protection=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization)
    {
        res.status(401).json({error:"please login in our website "})
    }
    const token=authorization.split(" ");
   console.log(token)
    jwt.verify(token[1],'secret',(err,payload)=>{
    console.log(payload)
        if(err)
        {  
            
            res.status(401).json({'err':"invalid token"})
    
        }
        else
        {
            next()
           
            
        }
    
    });
    }
module.exports=protection
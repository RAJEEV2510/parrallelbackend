const express=require('express')
const userModel=require('../Model/user')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const session=require('express-session');
const protection = require('./requireLogin');
const productModels=require('../Model/userDetails')
const {populate}=require('../Model/Category')
const productModel=require('../Model/Category')
const router=express.Router()


//signup with new user 
router.post('/signup',(req,res)=>{

    let email=req.body.email
    let password=req.body.password
    userModel.find({email:email}).then((data)=>{

        if(!data){
            
            res.status(200).json({'error':"user is already exist"})
        }

        else
        {
                bcrypt.hash(password,10,(err,hash)=>{

                    if(err)
                    {
                        throw err
                    }
                    else
                    {
                    let newuser=new userModel({
                        email,
                        password:hash
        
                    })
                    newuser.save().then(data=>{
                            console.log(data)
                            res.status(200).json({"success":"user has been register","data":data})
        
                    })
                }

                })
        }


    })
})


router.post('/signin',(req,res)=>{

    email=req.body.email
    password=req.body.password
    userModel.findOne({email}).then((data)=>{
      
        if(data){

            bcrypt.compare(password,data.password,(err,result)=>{

                if(result)
                {
                        console.log(result)
                        const token=jwt.sign({_id:data._id},"secret")
            
                        req.session.userid=data._id
                        req.session.token=token;
                           
                             
                            
                res.status(200).json({message:"message confirm",token:token,user:data})                    
                 
                }
    
                else
                {
                    res.status(200).json({'error':'invalid password '})
    
                }
    


            })
           

        }
        else
        {
            res.status(200).json({'error':'invalid user '})

        }
    })
    



})


router.post('/yourporducts',(req,res)=>{

    console.log(req.body)
    const productDetails=new productModels({

        address:req.body.address,
        product:req.body.product,
        totalCost:req.body.totalCost,
        buyingBy:req.body.buyingBy,
        status:req.body.status
        
    })

  
    productDetails.save().then(data=>{

            
        res.status(200).json({'data':data})

    })

})


router.get('/yourproducts/:id',(req,res)=>{

    const id=req.params.id
    console.log(req.params.id)
    productModels.find({buyingBy:id}).populate("product","productName productPrice productUrl").then((data)=>{
        console.log(data)
        res.status(200).json({'data':data})
    })
        

})


router.get('/profile',protection,(req,res)=>{
   

    
    res.status(200).json({'success':"you have succesfully login"})


})

router.post('/search',(req,res)=>{

    productModel.find({productName:req.body.name}).then((data)=>{
    	if(data.length >= 1 && data!= undefined)
    	{
            console.log(data)
    		
        res.status(200).json({data,})
    	}
    	else
    	{
           
    	res.status(200).json({"nodata":"nodata"})	
    	}
    })

})

module.exports=router

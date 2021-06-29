const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const blogModel=require('./Model/Category')
const route = require('./router/auth');
const cors=require('cors')
const session=require('express-session');
const protection=require('./router/requireLogin')
const adminrouter=require('./router/admin.router');
app.set('view engine', 'ejs');
app.use(cors())

app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:10000*60*24}
  }))

// 
app.use(bodyParser.json());
//
app.use('/', route);
app.use('/admin',adminrouter)

app.get('/',(req,res)=>{
   blogModel.find().then((result)=>{return result}).then((data)=>{console.log(data)   
    res.json({'data':data})
 })

})
app.get('/blog',(req,res)=>{

    res.render('product')

})
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/blog',(req,res)=>{
 
console.log(req.body)
    const blog=new blogModel({
        
        blogTitle:req.body.title,
       blogAuthor:req.body.author,
       blogDescription:req.body.blogdescription,
       blogImgUrl:req.body.blogurl,
       blogTime:req.body.time,
     })

   blog.save().then((data)=>{return data}).then((result)=>{

        res.send(result)
    })

})




app.listen(3000,()=>{

    console.log('server is running')
})
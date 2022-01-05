const path = require('path')
const mongoose = require("mongoose")
const express = require('express')
const ejs = require('ejs')
const multer=require('multer')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')



const { urlencoded } = require('body-parser')


const app = express()
const viewPath = path.join(__dirname,'./views')

//app.use(flash)
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'/public')))
app.use(express.urlencoded({extended : true}))
app.set('view engine','ejs')
app.set('views',viewPath)

//image upload
app.use('/upload',express.static(path.join(__dirname,'upload')));

// for middleware
app.use((req,res,next)=>{
    if(req.cookies && req.cookies.token){
        jwt.verify(req.cookies.token, 'abc123', (err, data) => {
            req.user = data
            next()
        })
    }else{
        next()
    }
 })

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("jpeg")){
        cb(null,true)
    }
    else{
        cb(null,false)
    }    
} 
app.use(multer({storage:fileStorage,fileFilter:fileFilter,limits:{fieldSize:1024*1024*5}}).single('image'))

//Admin Route
const adminRoute = require('./route/admin route/adminRoute')
app.use(adminRoute)


//User Route
const mainRoute = require('./route/mainRoute')
app.use(mainRoute)


// app.use((req,res)=>{
//     res.status(404).send('<h1>404!! Page not found </h1>')
// })

const DB = "mongodb+srv://Sayan:dz8Ez0zoCg0AxllO@cluster0.y6aqq.mongodb.net/Blog_DB?retryWrites=true&w=majority"
const port = process.env.PORT || 2522
mongoose.connect(DB,{useNewUrlParser : true, useUnifiedTopology : true}).then(result=>{
    app.listen(port,()=>{
        console.log(`Project is running on http://localhost:${port}`);
        console.log('Database connected successfully');
    })
}).catch(err=>{
    console.log(err);
})


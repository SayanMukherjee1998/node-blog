const jwt = require('jsonwebtoken')

const adminAuth = (req,res,next)=>{
    if(req.cookies && req.cookies.token){
        jwt.verify(req.cookies.token,"abc123",(err,data)=>{
            if(req.data && req.data == "user"){
                req.admin = data
                console.log("admin");
                next()
            }else{
                next()
            }
        })
    }else{
        next()
    }
}
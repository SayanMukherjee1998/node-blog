const express = require('express')
const cookieParser=require('cookie-parser')
const path=require('path')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const dataModel =require('../../model/dataModel')



exports.login = (req,res) =>{
    res.render('./admin views/login',{
        title : "Sign In"
    })
}
exports.postLogin = (req,res)=>{
    
    dataModel.findOne({email:req.body.email}, (err, data) => {
        if(data.role == "admin"){
            let hashpassword = data.password
            if(bcrypt.compareSync(req.body.password, hashpassword)){
                const token = jwt.sign({id:data._id, name:data.name}, 'abc123')
                res.cookie('token', token)
                if(req.body.remember){
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                res.redirect('/admin/dashboard')
            }
        }else{
            console.log('wrong input')
        }
    })
}
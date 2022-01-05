const express = require('express')
const path = require('path')
const dataModel = require('../model/dataModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

exports.login = (req,res) =>{
     loginData = {}
     loginData.email = (req.cookies.email) ? req.cookies.email : undefined
     loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render('login',{
        title : "Login Page",
         data : loginData
    })
}
exports.postLogin = (req,res)=>{
    dataModel.findOne({email:req.body.email}, (err, data) => {
        if(data){
            let hashpassword = data.password
            if(bcrypt.compareSync(req.body.password, hashpassword)){
                const token = jwt.sign({id:data._id, name:data.name}, 'abc123')
                res.cookie('token', token)
                if(req.body.remember){
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                res.redirect('/post')
            }
        }else{
            console.log('wrong input')
        }
    })
}

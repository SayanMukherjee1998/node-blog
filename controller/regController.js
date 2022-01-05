const express = require('express')
const path = require('path')
const bcrypt = require('bcryptjs')
const flash = require('connect-flash')
const passport = require('passport')
const dbModel = require('../model/dataModel')


exports.register = (req,res)=>{
    res.render('register',{
        title : "Sign Up Page"
    })

}
exports.postRegister = (req,res)=>{
    console.log(req.body);
    const {name, email, phone, password, re_password} = req.body
    
    let errors = []
    if(!name || !email || !phone || !password || !re_password){
        errors.push({msg : 'Please enter all the fields'})
    }
    if(password != re_password){
        errors.push({msg : "Your both passwords doesn't match"})
    }
    if(password.length<6){
        errors.push({msg : "Password must be atleast 6 charecter"})
    }
    
    if(errors.length>0){
        res.render('register',{
            // title : "Sign Up page",
            name,
            email,
            phone,
            password,
            re_password
        })
    }else{
        dbModel.findOne({email : email}).then(user=>{
            if(user){
                errors.push({msg : "Email already exist" })
                res.render('register',{
                    // title : "Sign Up page",
                    errors,
                    name,
                    email,
                    phone,
                    password,
                    re_password
                })
            }else{
                var newUser = new dbModel({
                    name,
                    email,
                    phone,
                    password
                })
            }
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err
                    newUser.password = hash
                    newUser.save().then(user=>{
                        // req.flash('success_message',"you're registered now and can login")
                        res.redirect('/logIn')
                    }).catch(error=>{
                        console.log(err);
                    })
                })
            })
        })
    }
}


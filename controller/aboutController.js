const path = require('path')
const express = require('express')
const aboutModel = require('../model/admin model/aboutModel')
exports.about = ((req,res)=>{
    aboutModel.find({status : 1},(err,data)=>{
        const trimmedData = data.toString().replace(/<\/?[^>]+(>|$)/g, '')
        // console.log(trimmedData);
        if(!err){

            res.render('about',{
                title : "About page",
                aboutData : data

            })

        }
    })
    
})
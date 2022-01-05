const path = require('path')
const express = require('express')
const postModel = require('../../model/postModel')
exports.post = ((req,res)=>{
    const postStatus = req.body.postStatus
    postModel.find({status : 1},(err,data)=>{
        if(!err){
            res.render('./admin views/post',{
                title : "All posts page",
                adminPostData : data
            })
        }
        
    })
    
})


exports.softDelete = (req,res)=>{
    const postId = req.params.p_id
    postModel.findByIdAndUpdate({_id : postId},{status : 0},(err,data)=>{
        if(!err){
            console.log('product deleted');
            res.redirect('/admin/post')
        }
    })

}


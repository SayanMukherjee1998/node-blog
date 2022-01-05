const path = require('path')
const express = require('express')
const postModel = require('../model/postModel')
exports.post = ((req,res)=>{
    res.render('post',{
        title : "Post page"
    })
})

exports.addPost =(req,res)=>{
    // console.log(req.body)
   const image= req.file
   const title = req.body.title.trim()
   const slug = title.replace(/\s+/g, '-').toLowerCase()
   console.log(image)
   const Posts= new postModel({
       title: req.body.title,
       subtitle: req.body.subtitle,
       post: req.body.postContent,
       image: image.path,
       status : 1,
       slug: slug
   })
   Posts.save().then((result)=>{
       console.log(result,"Post save successfully")
       res.redirect('/')
   }).catch((err)=>{
       console.log(err,"post not saved")
   })
}




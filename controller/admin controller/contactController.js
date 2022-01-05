const express = require('express')
const contactModel = require('../../model/contactModel')


exports.showData = (req,res)=>{
    contactModel.find({status :1},(err,data)=>{
        if(!err){
            res.render('./admin views/contactAdmin',{
                title : 'Contact details',
                contactData : data
            })
        }
    })
}

exports.hardDelete = (req,res)=>{
    const postId = req.params.c_id
    contactModel.findByIdAndDelete({_id : postId},(err,data)=>{
        if(!err){
            console.log('product deleted');
            res.redirect('/admin/contact')
        }
    })

}

exports.adminAuth = (req, res, next) => {
    if(req.user){
        next()   
    }else{
        res.redirect('login')
    }
}

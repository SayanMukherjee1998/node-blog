const path = require('path')
const express = require('express')
const postModel = require('../model/postModel')

exports.home = (req,res)=>{
    const pager = req.query.page ? req.query.page : 1
    const options = {
        page: pager,
        limit: 3,
        collation: {
          locale: 'en',
        },
      }
    postModel.paginate({status : 1}, options).then(function (data) {
        if(data){
            // console.log(data);
            res.render('index',{
                title : 'Home Page',
                postData : data,
                pager: pager

            })
        }   
    }).catch(err=>{
        console.log(err);
    })
    
}
exports.viewPost = (req,res)=>{
    postModel.findOne({slug: req.params.slug},(err,data)=>{
        if(!err){
            console.log(data)
             res.render('viewPost',{
                 title:"postdetails-page",
                viewData:data
             })
            
        }      
    })
}


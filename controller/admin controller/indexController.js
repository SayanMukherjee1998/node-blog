const express = require('express')


exports.index = (req,res) =>{
    res.render('./admin views/index',{
        title : "Home Page"
    })
}
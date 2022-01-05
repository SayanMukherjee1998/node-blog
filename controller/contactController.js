
const path = require('path')
const express = require('express')
const contactModel = require('../model/contactModel')

exports.contact = ((req,res)=>{
    res.render('contact',{
        title : "Contact Page"
    })
})

exports.contactDetails = (req,res)=>{
    const contactData = new contactModel({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        message : req.body.message,
        status : 1
    })
    contactData.save().then(result=>{
        res.redirect('/')
    }).catch(err=>{
        console.log(err,'data not saved.');
    })
}
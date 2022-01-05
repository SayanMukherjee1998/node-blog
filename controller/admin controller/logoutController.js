const express = require('express')


exports.logout=(req,res)=>{ 
    res.clearCookie("token")
    res.redirect('/admin/login')
}
const express = require('express')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema
const postSchema = new schema({
    title : {
    type : String,
    required : [true,"Title is required"]
    },
    subtitle : {
        type : String,
        required : [true,'subtitle is required']
    },
    post : {
        type : String,
        required : [true,'post is required']
    },
    image : {
        type : String,
        required : [true,'image is required']
    },
    status : {
        type : Number,
        required : true,
        default : 1
    },
    allowPost : {
        type : String,
        required : true,
        default : 'inactive'
    },
    slug : {
        type : String,
        required : true,
        unique : true
    },
    postedAt : {
        type : Date,
        required : true,
        default : Date.now
    }
})

postSchema.plugin(mongoosePaginate)
const postDetails = new mongoose.model('Post Data',postSchema)
module.exports = postDetails

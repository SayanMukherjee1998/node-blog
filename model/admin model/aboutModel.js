const mongoose = require('mongoose')
const schema = mongoose.Schema
const aboutDetails = new schema({
    about : {
        type : String,
        required : true
        
    },
    status : {
        type : Number,
        required : true,
        default : 1
    },
    postedAt : {
        type : Date,
        required : true,
        default : Date.now
    }
})

const aboutModel = new mongoose.model('About Data',aboutDetails)
module.exports = aboutModel
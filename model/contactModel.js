const mongoose = require('mongoose')
const schema = mongoose.Schema

const contactSchema = new schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    message : {
        type : String,
        required : false
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

const contactDetails = new mongoose.model('contact data',contactSchema)
module.exports = contactDetails



const mongoose = require('mongoose')
const schema = mongoose.Schema
const detailsSchema = new schema({
    name : {
        type : String,
        required : true        
    },
    email :  {
        type : String,
        required : true        
    },
    phone : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true        
    },
    date : {
        type : Date,
        default : Date.now
    },
    role : {
        type : String,
        required : true,
        default : "user"
    }
})
const detailsModel = new mongoose.model('Data Collection',detailsSchema)
module.exports = detailsModel
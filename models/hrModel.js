//const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');

const {Schema} = mongoose;

const hrData = new Schema({


    hrId: Number,
     firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
        },
        
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role:String,
    
    },{collection: "HrData"});


    module.exports =  mongoose.model("HrData", hrData);
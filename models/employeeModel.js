//const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');

const {Schema} = mongoose;

const employeeData = new Schema({


    employeeId: Number,
    
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
        mobile: {
            type: Number,
            required: true
        },
        position:{

            type: String,
            require: true
        },
       
        joiningDate: {

            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        role:String,
    
    },{collection: "EmployeeData"});


    module.exports =  mongoose.model("EmployeeData", employeeData);
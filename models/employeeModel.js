//const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');

const {Schema} = mongoose;

const employeeData = new Schema({
        firstName: {
            type: String,
            
        },
        lastName: {
            type: String,
        },
        
        email: {
            type: String,
            
        },
        mobile: {
            type: Number,
            
        },
        emergencyNo:{
           type:Number,
        },
        position:{

            type: String,
            
        },
       
        joiningDate: {

            type: String,
                    },
        password: {
            type: String,
            
        },
        address:{
            type:String,
        }
        
    
    },{collection: "EmployeeData"});


    module.exports =  mongoose.model("EmployeeData", employeeData);

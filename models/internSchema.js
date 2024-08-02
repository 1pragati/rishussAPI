//const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');

const {Schema} = mongoose;

const internData = new Schema({
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
        
        address:{
            type:String,
        },
        currentBalance:{
          type:Number,  
        },
        remainingBalance:{
            type:Number,  
        }
        
    
    },{collection: "InternData"});


    module.exports =  mongoose.model("InternData", internData);
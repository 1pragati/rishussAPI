const mongoose = require('mongoose');
const {Schema} = mongoose;

const SignupSchema = new Schema({
    firstName:{
        type:String,
    },
    lastName:{
       type:String,
    },
    email:{
        type:String,
    },
    password:{
          type:String,
    },
    info:Schema.Types.Mixed,
 
});

module.exports = mongoose.model('signupCol',SignupSchema);
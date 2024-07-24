const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URL = process.env.MONGO_URL 
//const DB = mongoose.connect(MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true})
//console.log(MONGO_URL);

const DB = mongoose.connect(MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    //console.log(DB);
    console.log("Database Connected");
}).catch((err)=>{
     console.log(err);
    console.log("Database Connection Error");
})


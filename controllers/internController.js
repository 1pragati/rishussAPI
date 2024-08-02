const Intern = require('../models/internSchema.js');
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const jwt = require('../config/genrateToken');


exports.addIntern = async(req, res)=>{

    try {
        
        const {  firstName, lastName, email, mobile,emergencyNo, position, joiningDate ,address,currentBalance,remainingBalance} = req.body;

        // Check if the intern already exists
        const existingIntern = await Intern.findOne({ email : email });
    
        if (existingIntern) {
          return res.status(400).json({ message: "intern with this email already exists" });
        }
        
        
        // Create a new intern document
        const newIntern = new Intern({
          firstName,
          lastName,
          email,
          mobile,
          emergencyNo,
          position,
          joiningDate,
          address,
          currentBalance,
          remainingBalance
  
         });
    
        // Save the new intern to the database
        await newIntern.save();
        //console.log(Ninfo);
    
        return res.status(200).json({ message: 'intern added successfully', Interndata: newIntern});
    
    } catch (error) {
        console.log(error);
        res.status(500).send("server error- "  + error);
    }
}



exports.internFetch=async(req,res)=>{
   try{
      const id=req.params.id;
       console.log(id);
       if(!id){
        return res.status(400).json({message:"id not found"});
         }
         const intern=await Intern.findById(id);
         console.log(intern);
          if(!intern){
            return res.status(400).json({msg:"intern details not found"});
          }
          return res.status(200).json(intern)
   }  
   catch(error){
     console.log(error);
     return res.status(500).json({message:error.message});
   }
}

exports.internDelete=async(req,res)=>{
   try{
     const id=req.params.id;
     console.log(id);
      if(!id){
        return res.status(400).json({msg:"id is not found"});
      }
      const intern= await Intern.findByIdAndDelete(id);
       if(!intern){
        return res.status(400).json({msg:"intern not found"})
      }
       return res.status(200).json({message:"delete successfully",intern})
   }
   catch(error){
    console.log(error);
    return res.status(500).json({message:error.message});
   }
}

exports.internUpdate = async (req,res)=>{

  try {
    const { firstName="", lastName="", email="", mobile="",emergencyNo="", position="", joiningDate="" ,password="",address="",currentBalance="",remainingBalance=""} = req.body;
    const id = req.params.id;
    console.log(id);
    if(!id){
      return res.status(400).json({ message: " Id is required"})
      
    }
    const intern = await Intern.findOneAndUpdate({_id:id},
      { firstName, lastName, email, mobile,emergencyNo, position, joiningDate ,password,address,currentBalance,remainingBalance})
    // console.log(intern)
     if(!intern){
      return res.status(400).json({ message : "intern not updated"})
      
    }
    return res.status(200).json({ message : "intern data update successfuly",intern })
} catch (error) {
  console.log(error)
}
};

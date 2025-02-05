const Employee = require('../models/employeeModel.js');
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const jwt = require('../config/genrateToken');
const nodemailer=require('nodemailer');

exports.addEmployee = async(req, res)=>{

    try {
        
        const {  employeId,  firstName, lastName, email, mobile,emergencyNo, position, joiningDate ,address} = req.body;

        // Check if the employee already exists
        const existingEmployee = await Employee.findOne({ email : email });
    
        if (existingEmployee) {
          return res.status(400).json({ message: "Employee with this email already exists" });
        }
        
         // Generate a random password
            const passcode = generator.generate({
                length: 15, 
                numbers: true
            });
               const password = passcode.toString();
            
               // Hash the generated password
               const hashPassword = await bcrypt.hash(password, 10);
        
        
       
    
        // Create a new Employee document
        const newEmployee = new Employee({
          employeId,
          firstName,
          lastName,
          email,
          mobile,
          emergencyNo,
          position,
          joiningDate,
          password: hashPassword,
          address
         });
    
        // Save the new employee to the database
        await newEmployee.save();
        //console.log(Ninfo);
    
        return res.status(200).json({ message: 'Employee added successfully', employee: newEmployee });
    
    } catch (error) {
        console.log(error);
        res.status(500).send("server error- "  + error);
    }
}


exports.employeeLogin = async(req, res)=>{

 
    try {
        const { email, password,role } = req.body;
        //console.log(role);
       
        // Find employee by email
        const employee = await Employee.findOne({ email });
    
        // Check if employee exists
        if (!employee) {
          return res.status(400).json({ msg: "Employee details not found" });
        }
    
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, employee.password);
    
        if (passwordMatch) {
          return res.status(400).json({ msg: "Incorrect password" });
        }
    
        // Login successful

        token = jwt.generateToken();

        return res.status(200).json({
          success: "employee logged In",
          Token: token,
          email:email,
          });
    
      } catch (error) {
        console.error("Error in employeeLogin:", error.message);
        return res.status(500).json({ msg: "Server error" });
      }
}

exports.employeFetch=async(req,res)=>{
   try{
      const id=req.params.id;
       console.log(id);
       if(!id){
        return res.status(400).json({message:"id not found"});
         }
         const employe=await Employee.findById(id);
         console.log(employe);
          if(!employe){
            return res.status(400).json({msg:"employe details not found"});
          }
          return res.status(200).json(employe)
   }  
   catch(error){
     console.log(error);
     return res.status(500).json({message:error.message});
   }
}

exports.employeDelete=async(req,res)=>{
   try{
     const id=req.params.id;
     console.log(id);
      if(!id){
        return res.status(400).json({msg:"id is not found"});
      }
      const employe= await Employee.findByIdAndDelete(id);
       if(!employe){
        return res.status(400).json({msg:"employe not found"})
      }
       return res.status(200).json({message:"delete successfully",employe})
   }
   catch(error){
    console.log(error);
    return res.status(500).json({message:error.message});
   }
}

exports.employeUpdate = async (req,res)=>{

  try {
    const {employeId="", firstName="", lastName="", email="", mobile="",emergencyNo="", position="", joiningDate="" ,password="",address=""} = req.body;
    const id = req.params.id;
    console.log(id);
    if(!id){
      return res.status(400).json({ message: " Id is required"})
      
    }
    const employe = await Employee.findOneAndUpdate({_id:id},
      { employeId,firstName, lastName, email, mobile,emergencyNo, position, joiningDate ,password,address})
     console.log(employe)
     if(!employe){
      return res.status(400).json({ message : "employe not updated"})
      
    }
    return res.status(200).json({ message : "employe data update successfuly",employe })
} catch (error) {
  console.log(error)
}
};

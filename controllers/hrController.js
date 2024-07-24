const Hr = require('../models/hrModel.js');
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const {generateToken} = require('../config/genrateToken');
const jwt =require('jsonwebtoken');

exports.addhr = async(req, res)=>{

    try {
        
        const { firstName, lastName, email, } = req.body;

        // Check if the employee already exists
        const existinghr = await Hr.findOne({ email });
    
        if (existinghr) {
          return res.status(400).json({ message: " email already exists" });
        } 
        // new role for hr 
        const Nrole='hr';    
        // Generate a random password
        const passcode = generator.generate({
          length: 15, 
          numbers: true
        });
        const password = passcode.toString();
    
        // Hash the generated password
        const hashPassword = await bcrypt.hash(password, 10);

        
    
        // Create a new Employee document
        const newHr = new Hr({
          firstName,
          lastName,
          email,
          password: hashPassword,
          role:Nrole,
        });
    
        // Save the new employee to the database
        await newHr.save();
    
        return res.status(200).json({ message: 'hr added successfully', hr: newHr});
    
    } catch (error) {
        res.status(500).send("server error- "  + error);
    }
}


// const bcrypt = require('bcrypt'); // Ensure bcrypt is required
// const jwt = require('jsonwebtoken'); // Ensure jsonwebtoken is required
// const Hr = require('../models/Hr'); // Ensure the Hr model is properly imported

exports.hrLogin = async (req, res)=>{
  try {
      const {email , password,role} = req.body;
      // console.log(role);

      const hr = await Hr.findOne({ email : email})
      console.log(hr);
          if(!hr){
              return res.status(400).json({ message : "hr not found"})
          }
          const match = await bcrypt.compare(password, hr.password);

          if (match) {
              return res.status(400).json({ message: "wrong password" });
            }

            const token = generateToken(hr.email)
            console.log(token)
            // console.log(hr.role);
            return res.status(200).json({ message: "login successfuly", token,email,'role':hr.role})
          
  } catch (error) {
      console.log(error)
      return res.status(500).json({ message : "enternal server error", error : error.message})
  }
}



const EmpSign = require('../models/empSignup');
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const jwt = require('../config/genrateToken');
const nodemailer=require('nodemailer');

exports.Signup = async(req, res)=>{

    try {
        
        const {firstName, lastName, email,password} = req.body;

        // Check if the employee already exists
        const existingEmp = await EmpSign.findOne({ email : email });
    
        if (existingEmp) {
          return res.status(400).json({ message: "Employee with this email already exists" });
        }
        
          //nodemailer
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          
          auth: {
              user: 'rishusinfotech@gmail.com',
              pass: 'vmojcraalasghhpl'
          },
        });
  
        const Ninfo = await transporter.sendMail({
          from: '"srishti sharma" <rishusinfotech@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "kindly check email and password", // Subject line
          text: `your email ${email} and your password ${password}`, // plain text body
        
          html:`your email ${email} and your password ${password}` // html body
        })
        console.log("Message sent: %s", Ninfo.messageId);
       //res.json(Ninfo);
  
  
  
      
           // Generate a random password
            const passcode = generator.generate({
                length: 15, 
                numbers: true
            });
               const pass = passcode.toString();
            
               // // Hash the generated password
               // const hashPassword = await bcrypt.hash(password, 10);
        
        
        const hashPassword = await bcrypt.hash(pass, 10);
    
        // Create a new Employee document
        const newEmp = new EmpSign({
          firstName,
          lastName,
          email,
          password: hashPassword,
          info:Ninfo
        });
    
        // Save the new employee to the database
        await newEmp.save();
        console.log(Ninfo);
    
        return res.status(200).json({ message: 'Employee added successfully', employee: newEmp});
    
    } catch (error) {
        console.log(error);
        res.status(500).send("server error- "  + error);
    }
}
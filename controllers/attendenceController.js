const express = require('express');
const Employe = require('../models/employeeModel');
const Attendance = require('../models/attendenceSchema');


// Mark attendance
exports.addAttendence = async(req,res)=>{
  
 
      const { employeId, status } = req.body;
      console.log({ employeId, status });
    
      try {
        const employee = await Employe.findOne({ employeId });
        console.log(employee);

        if (!employee) {
          return res.status(404).json({ message: 'Employee not found' });
        }
    
        const newAttendance = new Attendance({
          employeId,
           status,
        });
    
        await newAttendance.save();
        res.status(201).json(newAttendance);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
    
    // Get attendance for an employee
    exports.getAttendence = async(req,res)=>{
        const employeId = req.params.employeId;
        console.log(employeId)
    
        try {
          const attendanceRecords = await Attendance.find({ employeId});
          console.log(attendanceRecords)
          res.status(200).json(attendanceRecords);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    }
    
   
    
 
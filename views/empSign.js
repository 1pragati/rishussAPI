const express = require("express");

const router = express.Router();

const empSignController = require('../controllers/empSignup.js')

router.post("/signEmp", empSignController.Signup);


module.exports = router;
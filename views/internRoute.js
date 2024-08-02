const express = require("express");

const router = express.Router();

const internController = require('../controllers/internController.js')

router.post("/addintern", internController.addIntern);

//router.post("/internLogin", internController.employeeLogin);

router.get("/fetchintern/:id",internController.internFetch);

router.delete('/interndelete/:id',internController.internDelete);

router.put('/updateintern/:id',internController.internUpdate);

module.exports = router;
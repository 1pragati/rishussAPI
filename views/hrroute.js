const express = require("express");

const router = express.Router();

const hrController = require('../controllers/hrController.js')

router.post("/addhr", hrController.addhr);

router.post("/hrlogin", hrController.hrLogin );

module.exports = router;
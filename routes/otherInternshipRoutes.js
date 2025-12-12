const express = require("express");
const { registerOtherInternship } = require("../controllers/otherInternshipController");

const router = express.Router();

router.post("/", registerOtherInternship);

module.exports = router;

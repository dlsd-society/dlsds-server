const express = require("express");
const { registerInternship } = require("../controllers/internshipController");

const router = express.Router();

router.post("/", registerInternship);

module.exports = router;
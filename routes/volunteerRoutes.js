const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");

router.post("/submit", volunteerController.submitVolunteer);

module.exports = router;
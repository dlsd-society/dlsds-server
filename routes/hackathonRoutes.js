const express = require("express");
const { 
    createHackathon,
    getHackathons,
    getHackathonById, 
} = require("../controllers/hackathonController.js");

const router = express.Router();

// Create Hackathon
router.post("/", createHackathon);

// Get all Hackathons
router.get("/", getHackathons);

// Get Hackathon by ID (with participants)
router.get("/:id", getHackathonById);

module.exports = router;

const express = require("express");
const { registerParticipant } = require("../controllers/hackathonParticipantController.js");

const router = express.Router();

// Register for a specific hackathon
router.post("/:hackathonId/register", registerParticipant);

module.exports = router;

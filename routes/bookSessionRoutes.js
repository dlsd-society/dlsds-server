const express = require("express");
const router = express.Router();
const {
  createBookSession,
} = require("../controllers/bookSessionController");

router.post("/", createBookSession);

module.exports = router;

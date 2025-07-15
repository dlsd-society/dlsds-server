const express = require('express');
const router = express.Router();
const partnershipController = require('../controllers/partnershipController');

router.post('/submit', partnershipController.submitPartnership);

module.exports = router;
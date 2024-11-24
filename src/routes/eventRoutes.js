const express = require('express');
const { createEvent, queryEvents, validateChain } = require('../controllers/eventController');

const router = express.Router();

// Create Event
router.post('/', createEvent);

// Query Events
router.get('/', queryEvents);

// Validate Chain
router.get('/validate', validateChain);

module.exports = router;

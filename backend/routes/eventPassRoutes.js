const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createEventPass, getEventPasses, updateEventPass, deleteEventPass } = require('../controllers/eventPassController');
const router = express.Router();

router.post('/', protect, createEventPass); // Changed from '/event-passes' to '/'
router.get('/', protect, getEventPasses);  // Changed from '/event-passes' to '/'
router.put('/:id', protect, updateEventPass);
router.delete('/:id', protect, deleteEventPass);

module.exports = router;
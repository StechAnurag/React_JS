const express = require('express');
const router = express.Router({ mergeParams: true });
const { getNotes, addNote } = require('../controllers/noteController');

const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getNotes).post(protect, addNote);

module.exports = router;

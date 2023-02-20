const router = require('express').Router();
const { getTickets, createTicket, getTicket, updateTicket, deleteTicket } = require('../controllers/ticketController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getTickets).post(protect, createTicket);
router.route('/:ticketId').get(protect, getTicket).put(protect, updateTicket).delete(protect, deleteTicket);

module.exports = router;

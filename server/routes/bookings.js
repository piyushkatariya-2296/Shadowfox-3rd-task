const express = require('express');
const { check } = require('express-validator');
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  updateBookingStatus
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.post(
  '/',
  protect,
  [
    check('serviceId', 'Service ID is required').notEmpty(),
    check('bookingDate', 'Booking date is required').notEmpty(),
    check('timeSlot', 'Time slot is required').notEmpty()
  ],
  validate,
  createBooking
);

router.get('/my', protect, getMyBookings);
router.get('/', protect, authorize('admin'), getAllBookings);
router.patch('/:id/cancel', protect, cancelBooking);
router.patch('/:id/status', protect, authorize('admin'), updateBookingStatus);

module.exports = router;

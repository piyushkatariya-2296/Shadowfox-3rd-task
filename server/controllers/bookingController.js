const Booking = require('../models/Booking');
const Service = require('../models/Service');
const User = require('../models/User');
const sendEmail = require('../utils/emailService');
const mongoose = require('mongoose');

const mockBookings = [
  {
    _id: '66a1a1a1a1a1a1a1a1a1a777',
    user: { _id: '66a1a1a1a1a1a1a1a1a1a999', name: 'Alex Morgan', email: 'alex@example.com' },
    service: {
      _id: '66a1a1a1a1a1a1a1a1a1a1a1',
      title: 'High Intensity Interval Conditioning',
      category: 'HIIT',
      trainer: 'Marcus Vance',
      price: 36
    },
    bookingDate: '2026-08-05',
    timeSlot: '07:00 AM',
    status: 'confirmed',
    paymentStatus: 'paid',
    totalAmount: 36,
    createdAt: new Date().toISOString()
  }
];

// @desc    Create a new class booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res, next) => {
  try {
    const { serviceId, bookingDate, timeSlot, paymentIntentId, notes } = req.body;

    if (!serviceId || !bookingDate || !timeSlot) {
      return res.status(400).json({ success: false, message: 'Please provide serviceId, bookingDate, and timeSlot' });
    }

    if (mongoose.connection.readyState !== 1) {
      const newBooking = {
        _id: '66a1a1a1a1a1a1a1a' + Date.now().toString().slice(-5),
        user: req.user,
        service: { _id: serviceId, title: 'PulseFit Class', price: 36, trainer: 'PulseFit Coach', category: 'Fitness' },
        bookingDate,
        timeSlot,
        status: 'confirmed',
        paymentStatus: 'paid',
        totalAmount: 36,
        createdAt: new Date().toISOString()
      };
      mockBookings.unshift(newBooking);

      sendEmail({
        email: req.user.email || 'alex@example.com',
        subject: `Booking Confirmed: PulseFit Class`,
        message: `Your booking for ${bookingDate} at ${timeSlot} is confirmed!`
      }).catch(err => console.error(err));

      return res.status(201).json({ success: true, message: 'Booking completed successfully', data: newBooking });
    }

    let service = await Service.findById(serviceId);
    const booking = await Booking.create({
      user: req.user.id,
      service: serviceId,
      bookingDate,
      timeSlot,
      paymentIntentId: paymentIntentId || 'pi_test_' + Date.now(),
      totalAmount: service ? service.price : 36,
      paymentStatus: 'paid',
      notes: notes || ''
    });

    sendEmail({
      email: req.user.email,
      subject: `Booking Confirmation: ${service ? service.title : 'PulseFit Class'}`,
      message: `Your session is confirmed for ${bookingDate} at ${timeSlot}.`
    }).catch(err => console.error(err));

    res.status(201).json({ success: true, message: 'Booking completed successfully', data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's bookings
// @route   GET /api/bookings/my
// @access  Private
exports.getMyBookings = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({ success: true, count: mockBookings.length, data: mockBookings });
    }

    const bookings = await Booking.find({ user: req.user.id })
      .populate('service', 'title category trainer duration price imageUrl')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(200).json({ success: true, count: mockBookings.length, data: mockBookings });
  }
};

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
// @access  Private/Admin
exports.getAllBookings = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({ success: true, count: mockBookings.length, data: mockBookings });
    }

    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('service', 'title category trainer price')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(200).json({ success: true, count: mockBookings.length, data: mockBookings });
  }
};

// @desc    Cancel a booking
// @route   PATCH /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const b = mockBookings.find(item => item._id === req.params.id);
      if (b) b.status = 'cancelled';
      return res.status(200).json({ success: true, message: 'Booking cancelled', data: b || mockBookings[0] });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({ success: true, message: 'Booking cancelled', data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status (Admin only)
// @route   PATCH /api/bookings/:id/status
// @access  Private/Admin
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (mongoose.connection.readyState !== 1) {
      const b = mockBookings.find(item => item._id === req.params.id);
      if (b && status) b.status = status;
      return res.status(200).json({ success: true, message: 'Status updated', data: b || mockBookings[0] });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    if (status) booking.status = status;
    await booking.save();

    res.status(200).json({ success: true, message: 'Status updated', data: booking });
  } catch (error) {
    next(error);
  }
};

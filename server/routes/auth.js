const express = require('express');
const { check } = require('express-validator');
const { signup, login, getMe, updateProfile, forgotPassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const validate = require('../middleware/validate');

const router = express.Router();

router.post(
  '/signup',
  authLimiter,
  [
    check('name', 'Name is required').notEmpty().trim(),
    check('email', 'Please include a valid email address').isEmail().normalizeEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
  ],
  validate,
  signup
);

router.post(
  '/login',
  authLimiter,
  [
    check('email', 'Please include a valid email address').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists()
  ],
  validate,
  login
);

router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post(
  '/forgot-password',
  [check('email', 'Please include a valid email address').isEmail()],
  validate,
  forgotPassword
);

module.exports = router;

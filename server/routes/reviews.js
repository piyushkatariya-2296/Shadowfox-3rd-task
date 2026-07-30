const express = require('express');
const { check } = require('express-validator');
const { getServiceReviews, createReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/service/:serviceId', getServiceReviews);

router.post(
  '/',
  protect,
  [
    check('serviceId', 'Service ID is required').notEmpty(),
    check('rating', 'Rating must be between 1 and 5').isInt({ min: 1, max: 5 }),
    check('comment', 'Comment is required').notEmpty()
  ],
  validate,
  createReview
);

module.exports = router;

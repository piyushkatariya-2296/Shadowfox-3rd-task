const Review = require('../models/Review');
const Service = require('../models/Service');

// @desc    Get reviews for a service
// @route   GET /api/reviews/service/:serviceId
// @access  Public
exports.getServiceReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add review for a service
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res, next) => {
  try {
    const { serviceId, rating, comment } = req.body;

    if (!serviceId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide serviceId, rating (1-5), and comment'
      });
    }

    const review = await Review.create({
      user: req.user.id,
      service: serviceId,
      userName: req.user.name,
      rating: Number(rating),
      comment
    });

    // Recalculate rating on Service if exists
    const service = await Service.findById(serviceId);
    if (service) {
      const allReviews = await Review.find({ service: serviceId });
      const avgRating = allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length;
      service.rating = Number(avgRating.toFixed(1));
      service.reviewsCount = allReviews.length;
      await service.save();
    }

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: review
    });
  } catch (error) {
    next(error);
  }
};

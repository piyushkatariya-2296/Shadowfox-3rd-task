const express = require('express');
const { check } = require('express-validator');
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById);

router.post(
  '/',
  protect,
  authorize('admin'),
  [
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('category', 'Category is required').notEmpty(),
    check('trainer', 'Trainer is required').notEmpty(),
    check('price', 'Price must be a positive number').isNumeric()
  ],
  validate,
  createService
);

router.put('/:id', protect, authorize('admin'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

module.exports = router;

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a class title'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please add a class description']
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      enum: ['HIIT', 'Yoga', 'Strength', 'Pilates', 'Cycling', 'Recovery']
    },
    trainer: {
      type: String,
      required: [true, 'Please add trainer name']
    },
    price: {
      type: Number,
      required: [true, 'Please specify price per session']
    },
    duration: {
      type: Number,
      required: [true, 'Please specify duration in minutes']
    },
    capacity: {
      type: Number,
      default: 20
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
      default: 'All Levels'
    },
    schedule: {
      type: [String],
      default: ['09:00 AM', '02:00 PM', '06:00 PM']
    },
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=60'
    },
    rating: {
      type: Number,
      default: 4.8
    },
    reviewsCount: {
      type: Number,
      default: 12
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Service', serviceSchema);

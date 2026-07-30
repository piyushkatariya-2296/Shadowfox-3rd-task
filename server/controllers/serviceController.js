const Service = require('../models/Service');
const mongoose = require('mongoose');

// Fallback sample list for immediate instant response if DB is offline or empty
const sampleServices = [
  {
    _id: '66a1a1a1a1a1a1a1a1a1a1a1',
    title: 'High Intensity Interval Conditioning',
    description: 'Energy system conditioning utilizing Concept2 ergs, kettlebells, and bodyweight intervals capped at 12 participants.',
    category: 'HIIT',
    trainer: 'Marcus Vance',
    price: 36,
    duration: 50,
    capacity: 12,
    level: 'Intermediate',
    schedule: ['07:00 AM', '12:00 PM', '05:30 PM'],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 28,
    isActive: true
  },
  {
    _id: '66a1a1a1a1a1a1a1a1a1a1a2',
    title: 'Vinyasa Flow & Structural Alignment',
    description: 'Dynamic breath-to-movement flow focusing on shoulder stability, hamstring length, and spinal decompression.',
    category: 'Yoga',
    trainer: 'Elena Rostova',
    price: 32,
    duration: 60,
    capacity: 15,
    level: 'All Levels',
    schedule: ['08:00 AM', '10:00 AM', '06:30 PM'],
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80',
    rating: 4.95,
    reviewsCount: 42,
    isActive: true
  },
  {
    _id: '66a1a1a1a1a1a1a1a1a1a1a3',
    title: 'Reformer Pilates Core Lab',
    description: 'Spring-loaded resistance work targeting deep transverse abdominals, pelvic stability, and muscular endurance.',
    category: 'Pilates',
    trainer: 'Sarah Jenkins',
    price: 48,
    duration: 55,
    capacity: 10,
    level: 'Intermediate',
    schedule: ['09:00 AM', '03:00 PM', '07:00 PM'],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    rating: 4.92,
    reviewsCount: 31,
    isActive: true
  },
  {
    _id: '66a1a1a1a1a1a1a1a1a1a1a4',
    title: 'Barbell Kinematics & Heavy Strength',
    description: 'Compound lift mechanics (squat, bench, deadlift) focusing on bar velocity, tempo control, and progressive overload.',
    category: 'Strength',
    trainer: 'David Miller',
    price: 42,
    duration: 60,
    capacity: 10,
    level: 'Advanced',
    schedule: ['06:00 AM', '04:00 PM', '06:00 PM'],
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    rating: 4.88,
    reviewsCount: 39,
    isActive: true
  },
  {
    _id: '66a1a1a1a1a1a1a1a1a1a1a5',
    title: 'Rhythm Spin & Cadence Intervals',
    description: 'Cadence-driven indoor cycling structured with hill climbs, threshold sprints, and heart rate zone targeting.',
    category: 'Cycling',
    trainer: 'Chloe Bennett',
    price: 34,
    duration: 45,
    capacity: 20,
    level: 'All Levels',
    schedule: ['06:30 AM', '05:00 PM', '07:30 PM'],
    imageUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&auto=format&fit=crop&q=80',
    rating: 4.85,
    reviewsCount: 19,
    isActive: true
  },
  {
    _id: '66a1a1a1a1a1a1a1a1a1a1a6',
    title: 'Myofascial Mobility & Infrared Recovery',
    description: 'Targeted foam rolling, active stretching, and thermal light therapy for rapid muscular recovery.',
    category: 'Recovery',
    trainer: 'Dr. Liam Thorne',
    price: 38,
    duration: 50,
    capacity: 12,
    level: 'Beginner',
    schedule: ['11:00 AM', '04:30 PM'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    rating: 4.97,
    reviewsCount: 24,
    isActive: true
  }
];

// @desc    Get all services with filter & search
// @route   GET /api/services
// @access  Public
exports.getAllServices = async (req, res, next) => {
  try {
    const { category, level, search } = req.query;

    // Check if MongoDB is connected; if not, immediately filter sampleServices without timeout delay
    if (mongoose.connection.readyState !== 1) {
      let filtered = [...sampleServices];
      if (category && category !== 'All') {
        filtered = filtered.filter(s => s.category === category);
      }
      if (level && level !== 'All') {
        filtered = filtered.filter(s => s.level === level);
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(s =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.trainer.toLowerCase().includes(q)
        );
      }
      return res.status(200).json({
        success: true,
        count: filtered.length,
        data: filtered
      });
    }

    let filter = { isActive: true };
    if (category && category !== 'All') filter.category = category;
    if (level && level !== 'All') filter.level = level;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { trainer: { $regex: search, $options: 'i' } }
      ];
    }

    let services = await Service.find(filter).sort({ createdAt: -1 });
    if (services.length === 0 && (!category || category === 'All') && (!search)) {
      services = sampleServices;
    }

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      count: sampleServices.length,
      data: sampleServices
    });
  }
};

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
exports.getServiceById = async (req, res, next) => {
  try {
    let service;
    if (mongoose.connection.readyState === 1) {
      service = await Service.findById(req.params.id);
    }
    if (!service) {
      service = sampleServices.find(s => s._id === req.params.id);
    }
    if (!service) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    const fallback = sampleServices.find(s => s._id === req.params.id) || sampleServices[0];
    res.status(200).json({ success: true, data: fallback });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Admin
exports.createService = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const newService = {
        _id: '66a1a1a1a1a1a1a1a1a1a' + Date.now().toString().slice(-3),
        ...req.body,
        rating: 5.0,
        reviewsCount: 1,
        isActive: true
      };
      sampleServices.unshift(newService);
      return res.status(201).json({ success: true, message: 'Class created', data: newService });
    }
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, message: 'Class created', data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
exports.updateService = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const idx = sampleServices.findIndex(s => s._id === req.params.id);
      if (idx !== -1) {
        sampleServices[idx] = { ...sampleServices[idx], ...req.body };
        return res.status(200).json({ success: true, message: 'Class updated', data: sampleServices[idx] });
      }
    }
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, message: 'Class updated', data: service });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
exports.deleteService = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const idx = sampleServices.findIndex(s => s._id === req.params.id);
      if (idx !== -1) {
        sampleServices.splice(idx, 1);
      }
      return res.status(200).json({ success: true, message: 'Class deleted' });
    }
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Class deleted' });
  } catch (error) {
    next(error);
  }
};

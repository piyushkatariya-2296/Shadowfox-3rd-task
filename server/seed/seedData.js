const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

dotenv.config({ path: '../.env' });

const seedServices = [
  {
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

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pulsefit_db';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for Seeding...');

    await User.deleteMany();
    await Service.deleteMany();
    await Booking.deleteMany();
    await Review.deleteMany();

    const adminUser = await User.create({
      name: 'PulseFit Admin',
      email: 'admin@pulsefit.com',
      password: 'adminpassword123',
      role: 'admin',
      phone: '+1 (415) 890-3412'
    });

    const demoUser = await User.create({
      name: 'Alex Morgan',
      email: 'alex@example.com',
      password: 'userpassword123',
      role: 'user',
      phone: '+1 (415) 555-0192'
    });

    const createdServices = await Service.insertMany(seedServices);
    console.log(`${createdServices.length} Services seeded.`);

    await Booking.create({
      user: demoUser._id,
      service: createdServices[0]._id,
      bookingDate: '2026-08-05',
      timeSlot: '07:00 AM',
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentIntentId: 'pi_test_seed_123',
      totalAmount: createdServices[0].price,
      notes: 'First Reformer session.'
    });

    console.log('Database Seeding Complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error with data seeding:', error.message);
    process.exit(1);
  }
};

seedDB();

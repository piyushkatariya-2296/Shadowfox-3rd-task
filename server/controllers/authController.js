const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const mongoose = require('mongoose');

// Mock in-memory users if DB is disconnected
const mockUsers = [
  {
    _id: '66a1a1a1a1a1a1a1a1a1a999',
    name: 'Alex Morgan',
    email: 'alex@example.com',
    password: 'userpassword123',
    role: 'user',
    phone: '+1 (415) 555-0192'
  },
  {
    _id: '66a1a1a1a1a1a1a1a1a1a888',
    name: 'PulseFit Admin',
    email: 'admin@pulsefit.com',
    password: 'adminpassword123',
    role: 'admin',
    phone: '+1 (415) 890-3412'
  }
];

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const newUser = {
        _id: '66a1a1a1a1a1a1a1a1a' + Date.now().toString().slice(-4),
        name,
        email,
        password,
        role: role === 'admin' ? 'admin' : 'user',
        phone: phone || ''
      };
      mockUsers.push(newUser);
      const token = generateToken(newUser._id, newUser.role);
      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, phone: newUser.phone }
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({ name, email, password, phone: phone || '', role: role === 'admin' ? 'admin' : 'user' });
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (mongoose.connection.readyState !== 1) {
      const mockUser = mockUsers.find(u => u.email === email);
      if (!mockUser || mockUser.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid email or password credentials' });
      }
      const token = generateToken(mockUser._id, mockUser.role);
      return res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        token,
        user: { id: mockUser._id, name: mockUser.name, email: mockUser.email, role: mockUser.role, phone: mockUser.phone }
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password credentials' });
    }

    const token = generateToken(user._id, user.role);
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const mockUser = mockUsers.find(u => u._id === req.user.id) || mockUsers[0];
      return res.status(200).json({
        success: true,
        user: { id: mockUser._id, name: mockUser.name, email: mockUser.email, role: mockUser.role, phone: mockUser.phone }
      });
    }
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    if (mongoose.connection.readyState !== 1) {
      const mockUser = mockUsers.find(u => u._id === req.user.id) || mockUsers[0];
      if (name) mockUser.name = name;
      if (phone !== undefined) mockUser.phone = phone;
      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: { id: mockUser._id, name: mockUser.name, email: mockUser.email, role: mockUser.role, phone: mockUser.phone }
      });
    }

    const user = await User.findByIdAndUpdate(req.user.id, { name, phone }, { new: true, runValidators: true });
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot Password Request
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Password reset instructions sent to your email (simulated)'
  });
};

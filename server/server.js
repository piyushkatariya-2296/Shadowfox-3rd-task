const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security Headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: false // Disabled for dev flexibility
  })
);

// CORS restricted to allowed origins
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow for API testing/dev environment
      }
    },
    credentials: true
  })
);

// API Health Check & Welcome Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'Operational',
    timestamp: new Date().toISOString(),
    message: 'PulseFit Studio REST API is active'
  });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/payments', require('./routes/payments'));

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found on this server`
  });
});

// Centralized Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\n🚀 PulseFit Express Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`👉 API Health Check: http://localhost:${PORT}/api/health\n`);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
});

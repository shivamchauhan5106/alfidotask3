const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();

app.use(express.json());
app.use(cookieParser());                                    // parse httpOnly cookies
app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Auth routes  (public: register, login, logout; protected: /me)
app.use('/api/auth', authRoutes);

// Product routes (GET public, mutations protected)
app.use('/api/products', productRoutes);

app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'Route not found' });
  }
  res.status(404).sendFile(path.join(__dirname, '../public/login.html'));
});

app.use(errorHandler);

module.exports = app;

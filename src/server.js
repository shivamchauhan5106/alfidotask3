require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
  });
};

startServer();

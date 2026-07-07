import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/database';
import { logger } from './utils/logger';
import mongoose from 'mongoose';

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(\`Server running in \${process.env.NODE_ENV} mode on port \${PORT}\`);
});

// Graceful Shutdown
const gracefulShutdown = () => {
  logger.info('Received kill signal, shutting down gracefully.');
  
  server.close(async () => {
    logger.info('Closed out remaining connections.');
    
    try {
      await mongoose.connection.close(false);
      logger.info('MongoDB connection closed.');
      process.exit(0);
    } catch (err) {
      logger.error('Error closing MongoDB connection', err);
      process.exit(1);
    }
  });
  
  // Force close after 10s
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(\`\${err.name}: \${err.message}\`);
  server.close(() => {
    process.exit(1);
  });
});

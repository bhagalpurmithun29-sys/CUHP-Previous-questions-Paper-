import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/database';
import { logger } from './utils/logger';
import mongoose from 'mongoose';
import net from 'net';

const PORT = Number(process.env.PORT) || 5001;

/**
 * Checks if the port is in use and resolves with true/false
 */
function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once('error', () => resolve(true))
      .once('listening', () => tester.close(() => resolve(false)))
      .listen(port);
  });
}

async function startServer() {
  const inUse = await isPortInUse(PORT);
  if (inUse) {
    logger.warn(`Port ${PORT} is in use. Waiting 2s for previous process to release...`);
    await new Promise(r => setTimeout(r, 2000));
  }

  // Connect to Database
  await connectDB();

  const server = app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      logger.error(`Port ${PORT} is still in use. Kill the process using it and retry.`);
      process.exit(1);
    } else {
      throw err;
    }
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
    logger.error(`${err?.name}: ${err?.message}`);
    server.close(() => {
      process.exit(1);
    });
  });
}

startServer().catch((err) => {
  console.error('Fatal error during server startup:', err);
  process.exit(1);
});

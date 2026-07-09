import express, { Application, Request, Response, NextFunction } from 'express';
import './interfaces/request.interface';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { globalErrorHandler } from './middlewares/error.middleware';
import { NotFoundError } from './utils/ApiError';
import { logger } from './utils/logger';
import routes from './routes';

const app: Application = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Performance Middlewares
app.use(compression());

// Request Logging Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'test') {
    logger.info(`${req.method} ${req.originalUrl}`);
  }
  next();
});

// Body Parsing Middlewares
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// API Routes
app.use('/api/v1', routes);

// Handle undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;

import express from 'express';
import { publicRouter } from '../route/public-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js'
import { userRouter } from '../route/api.js';
import compression from 'compression';

export const web = express();

web.use(compression());
web.use(express.json({ limit: '256kb' }));

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
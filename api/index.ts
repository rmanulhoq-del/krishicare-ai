import express, { Request, Response } from 'express';
import { apiRouter } from '../server/routes';

const app = express();

// Generous body limit for plant disease photos
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', name: 'AgriCare AI', timestamp: new Date().toISOString() });
});

// Mount router both with and without /api prefix for Vercel serverless compatibility
app.use('/api', apiRouter);
app.use(apiRouter);

export default app;

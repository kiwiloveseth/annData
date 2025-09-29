// AnnData Backend Application
// This is a placeholder that will be implemented in future versions

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes placeholder
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AnnData Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Placeholder routes that will be implemented:
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/crops', cropRoutes);
// app.use('/api/marketplace', marketplaceRoutes);
// app.use('/api/traceability', traceabilityRoutes);

// Error handling middleware placeholder
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 AnnData Backend running on port ${PORT}`);
  });
}

export default app;
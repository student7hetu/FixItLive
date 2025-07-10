import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoute.js'; // auth route
// You can import other routes here later

dotenv.config();
const app = express();

// 🌐 Middleware
app.use(cors()); // Enable CORS for frontend connection
app.use(express.json()); // Parse incoming JSON

// 🔗 API Routes
app.use('/api/auth', authRoutes); // Mount auth routes at /api/auth

// 🧪 Default route (for test)
app.get('/', (req, res) => {
  res.send('FixItLive backend is running ✅');
});

// 🌍 Connect MongoDB & Start Server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });

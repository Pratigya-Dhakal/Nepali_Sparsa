import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import productRoutes from './src/routes/productRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';
import dealRoutes from './src/routes/dealRoutes.js';

// Initialize dotenv
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));



// API routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api', dealRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port number ${port}`);
});

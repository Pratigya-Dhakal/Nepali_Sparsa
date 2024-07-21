import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import bodyParser from 'body-parser';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000; 

app.use(bodyParser.json());

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, () => {
    console.log(`Server is running on port number ${port}`);
});

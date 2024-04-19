import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import pool from './config/db.js';
import { apiErrorHandler } from './middleware/errorHandler.js';
import heroRoutes from './routes/heroRoutes.js';
import industryRoutes from './routes/industryRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set up the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Use Helmet middleware for enhanced security
app.use(bodyParser.json()); // Body parsing middleware
app.use(morgan('dev')); // Log requests in combined format

// Routes
app.get('/api/v1', (req, res) => {
    // Default route handler
    res.status(200).json({ message: 'Welcome to the API! Available endpoints: /api/v1/heroes /api/v1/industries /api/v1/movies' });
});

// Mount routes
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/industries', industryRoutes);
app.use('/api/v1/heroes', heroRoutes);


// Error handling middleware
app.use(apiErrorHandler);

// Start the server
const startServer = async () => {
    // Connect to the database
    try {
        await pool.query('SELECT 1');
        console.log('Connected to database successfully!');

        // Start the server
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        // Cleanup when the server is closing
        server.on('close', closeServer);
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

// Function to clean up resources when the server closes
const closeServer = () => {
    // Close the PostgreSQL connection pool
    pool.end()
        .then(() => console.log('PostgreSQL connection pool has been closed'))
        .catch(err => console.error('Error closing PostgreSQL connection pool', err));
};

// Invoke the function to start the server
startServer();

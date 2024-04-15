import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connectToDatabase } from './src/database.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import heroRoutes from './src/routes/heroRoutes.js';


dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

// Import routes and other middleware here
app.use('/api/v1', heroRoutes);

// Centralized error handling middleware
app.use(errorHandler);

// Start the server
const startServer = async () => {
    try {
        // Connect to the database
        const db = await connectToDatabase();

        console.log(`Connected to database successfully!`);

        await db.execute(`SELECT 1`);

        console.log(`Ran a sample query to database successfully!`);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Application running on port: ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();

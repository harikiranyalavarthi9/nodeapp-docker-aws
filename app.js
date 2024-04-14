import express from 'express';
import {connectToDatabase} from './database.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`Hello from App!`);
});

app.listen(PORT, async () => {
    console.log(`Node App running on port: ${PORT}`);
    const db = await connectToDatabase();

    await db.execute('SELECT 1');

    console.log(`Test query to the database successful`);
})

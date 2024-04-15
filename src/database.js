import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const connectToDatabase = async () => {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        return db;
    } catch(error) {
        console.error(`Error connecting to database: ${error}`);
        throw error;
    }
};
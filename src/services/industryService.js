import pool from '../config/db.js';
import { databaseErrorHandler } from '../middleware/errorHandler.js';

// Get all industries from the database
export const getIndustriesFromDatabase = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM industries;');
        client.release(); // Release the client back to the pool
        return result.rows;
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to fetch industries');
    }
};

// Get an industry by ID from the database
export const getIndustryByIdFromDatabase = async (id) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM industries WHERE id = $1', [id]);
        client.release(); // Release the client back to the pool
        return result.rows[0]; // Assuming only one industry will match the ID
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to fetch industry by ID');
    }
};

// Create an industry in the database
export const createIndustryInDatabase = async (insertData) => {
    const { name, hub } = insertData;
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO industries(name, hub) VALUES ($1, $2) RETURNING *',
            [name, hub]
        );
        client.release(); // Release the client back to the pool
        return result.rows[0];
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to create industry');
    }
};

// Update an industry by ID in the database
export const updateIndustryByIdInDatabase = async (id, updateData) => {
    const { name, hub } = updateData;
    try {
        const client = await pool.connect();
        const result = await client.query(
            'UPDATE industries SET name=$1, hub=$2 WHERE id=$3 RETURNING *',
            [name, hub, id]
        );
        client.release(); // Release the client back to the pool
        return result.rows[0];
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to update industry by ID');
    }
};

// Delete an industry by ID from the database
export const deleteIndustryByIdFromDatabase = async (id) => {
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM industries WHERE id = $1 RETURNING *', [id]);
        client.release(); // Release the client back to the pool
        return result.rows[0];
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to delete industry by ID');
    }
};

// Delete all industries from the database
export const deleteIndustriesFromDatabase = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM industries RETURNING *');
        client.release(); // Release the client back to the pool
        return result.rows;
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to delete all industries');
    }
};

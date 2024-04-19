import pool from '../config/db.js';
import { databaseErrorHandler } from '../middleware/errorHandler.js';

// Get all heroes from the database
export const getHeroesFromDatabase = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM heroes;');
        client.release(); // Release the client back to the pool
        return result.rows;
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to fetch heroes');
    }
}

// Get a hero by ID from the database
export const getHeroByIdFromDatabase = async (id) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM heroes WHERE id = $1', [id]);
        client.release(); // Release the client back to the pool
        return result.rows[0]; // Assuming only one hero will match the ID
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to fetch hero by ID');
    }
}

// Create a hero in the database
export const createHeroInDatabase = async (insertData) => {
    const { name, title, industry_id } = insertData;
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO heroes(name, title, industry_id) VALUES ($1, $2, $3) RETURNING *',
            [name, title, industry_id]
        );
        client.release(); // Release the client back to the pool
        return result.rows[0];
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to create hero');
    }
}

// Update a hero by ID in the database
export const updateHeroByIdInDatabase = async (id, updateData) => {
    const { name, title, industry_id } = updateData;
    try {
        const client = await pool.connect();
        const result = await client.query(
            'UPDATE heroes SET name=$1, title=$2, industry_id=$3 WHERE id=$4 RETURNING *',
            [name, title, industry_id, id]
        );
        client.release(); // Release the client back to the pool
        return result.rows[0];
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to update hero by ID');
    }
}

// Delete a hero by ID from the database
export const deleteHeroByIdFromDatabase = async (id) => {
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM heroes WHERE id = $1 RETURNING *', [id]);
        client.release(); // Release the client back to the pool
        return result.rows[0];
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to delete hero by ID');
    }
}

// Delete all heroes from the database
export const deleteHeroesFromDatabase = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM heroes RETURNING *');
        client.release(); // Release the client back to the pool
        return result.rows;
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to delete all heroes');
    }
}
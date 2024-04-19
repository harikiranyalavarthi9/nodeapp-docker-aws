import pool from '../config/db.js';
import { databaseErrorHandler } from '../middleware/errorHandler.js';

// Get all movies from the database
export const getMoviesFromDatabase = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM movies;');
        client.release(); // Release the client back to the pool
        return result.rows;
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to fetch movies');
    }
}

// Get a movie by ID from the database
export const getMovieByIdFromDatabase = async (id) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM movies WHERE id = $1', [id]);
        client.release(); // Release the client back to the pool
        return result.rows[0]; // Assuming only one movie will match the ID
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to fetch movie by ID');
    }
}

// Create a movie in the database
export const createMovieInDatabase = async (insertData) => {
    const { name, plot, release } = insertData;
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO movies(name, plot, release) VALUES ($1, $2, $3) RETURNING *',
            [name, plot, release]
        );
        client.release(); // Release the client back to the pool
        return result.rows[0];
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to create movie');
    }
}

// Update a movie by ID in the database
export const updateMovieByIdInDatabase = async (id, updateData) => {
    const { name, plot, release } = updateData;
    try {
        const client = await pool.connect();
        const result = await client.query(
            'UPDATE movies SET name=$1, plot=$2, release=$3 WHERE id=$4 RETURNING *',
            [name, plot, release, id]
        );
        client.release(); // Release the client back to the pool
        return result.rows[0];
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to update movie by ID');
    }
}

// Delete a movie by ID from the database
export const deleteMovieByIdFromDatabase = async (id) => {
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);
        client.release(); // Release the client back to the pool
        return result.rows[0];
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to delete movie by ID');
    }
}

// Delete all movies from the database
export const deleteMoviesFromDatabase = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM movies RETURNING *');
        client.release(); // Release the client back to the pool
        return result.rows;
    } catch (error) {
        databaseErrorHandler(error);
        throw new Error('Failed to delete all movies');
    }
}

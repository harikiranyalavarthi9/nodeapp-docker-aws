import express from 'express';
import {
    getMovies,
    getMovieById,
    createMovie,
    updateMovieById,
    deleteMovieById,
    deleteMovies
} from '../controllers/movieController.js';

const router = express.Router();

// Define routes for CRUD operations on movies
router.route('/')
    .get(getMovies)     // Retrieve all movies
    .post(createMovie);  // Create a new movie

router.route('/:id')
    .get(getMovieById)         // Retrieve a specific movie by ID
    .put(updateMovieById)      // Update a specific movie by ID
    .delete(deleteMovieById);  // Delete a specific movie by ID

// Define a route to delete all movies
router.delete('/', deleteMovies);

export default router;

import { getMoviesFromDatabase, getMovieByIdFromDatabase, createMovieInDatabase, updateMovieByIdInDatabase, deleteMovieByIdFromDatabase, deleteMoviesFromDatabase } from '../services/movieService.js';

export const getMovies = async (req, res, next) => {
    try {
        const result = await getMoviesFromDatabase();
        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
};

export const getMovieById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: 'ID parameter is missing or invalid' });
        }

        const result = await getMovieByIdFromDatabase(id);
        if (!result) {
            return res.status(404).json({ message: 'No movie found for the provided ID' });
        }

        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
};

export const createMovie = async (req, res, next) => {
    try {
        const result = await createMovieInDatabase(req.body);
        res.status(201).json(result);
    } catch(error) {
        next(error);
    }
};

export const updateMovieById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: 'ID parameter is missing or invalid' });
        }

        const result = await updateMovieByIdInDatabase(id, req.body);
        if (!result) {
            return res.status(404).json({ message: 'No movie found with the provided ID' });
        }

        res.status(200).json({ message: 'Movie updated successfully' });
    } catch(error) {
        next(error);
    }
};

export const deleteMovieById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: 'ID parameter is missing or invalid' });
        }

        const result = await deleteMovieByIdFromDatabase(id);
        if (!result) {
            return res.status(404).json({ message: 'No movie found with the provided ID' });
        }

        res.status(200).json({ message: `Movie with ID ${id} deleted successfully` });
    } catch(error) {
        next(error);
    }
};

export const deleteMovies = async (req, res, next) => {
    try {
        await deleteMoviesFromDatabase();
        res.status(200).json({ message: 'Deleted all movies successfully' });
    } catch(error) {
        next(error);
    }
};

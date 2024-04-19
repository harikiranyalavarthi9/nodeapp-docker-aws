import { getHeroesFromDatabase, getHeroByIdFromDatabase, createHeroInDatabase, updateHeroByIdInDatabase, deleteHeroByIdFromDatabase, deleteHeroesFromDatabase } from '../services/heroService.js';

export const getHeroes = async (req, res, next) => {
    try {
        const result = await getHeroesFromDatabase();
        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
};

export const getHeroById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: 'ID parameter is missing or invalid' });
        }

        const result = await getHeroByIdFromDatabase(id);
        if (!result) {
            return res.status(404).json({ message: 'No hero found for the provided ID' });
        }

        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
};

export const createHero = async (req, res, next) => {
    try {
        const result = await createHeroInDatabase(req.body);
        res.status(201).json(result);
    } catch(error) {
        next(error);
    }
};

export const updateHeroById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: 'ID parameter is missing or invalid' });
        }

        const result = await updateHeroByIdInDatabase(id, req.body);
        if (!result) {
            return res.status(404).json({ message: 'No hero found with the provided ID' });
        }

        res.status(200).json({ message: 'Hero updated successfully' });
    } catch(error) {
        next(error);
    }
};

export const deleteHeroById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: 'ID parameter is missing or invalid' });
        }

        const result = await deleteHeroByIdFromDatabase(id);
        if (!result) {
            return res.status(404).json({ message: 'No hero found with the provided ID' });
        }

        res.status(200).json({ message: `Hero with ID ${id} deleted successfully` });
    } catch(error) {
        next(error);
    }
};

export const deleteHeroes = async (req, res, next) => {
    try {
        await deleteHeroesFromDatabase();
        res.status(200).json({ message: 'Deleted all heroes successfully' });
    } catch(error) {
        next(error);
    }
};

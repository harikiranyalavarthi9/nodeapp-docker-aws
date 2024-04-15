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
        if (result.length === 0) {
            return res.status(200).json({ message: 'No data found for the provided ID' });
        }

        res.status(200).json(result[0]);
    } catch(error) {
        next(error);
    }
};

export const createHero = async (req, res, next) => {
    try {
        const result = await createHeroInDatabase(req.body);
        if(result.affectedRows === 1) {
            res.status(201).json({message:`Data received and added into the database successfully!`, data: result});
        }
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

        const { name, industry, description, image_data } = req.body;

        if (!name || !industry || !description) {
            return res.status(400).json({ message: 'Fields (name, industry, description) are required' });
        }

        const result = await updateHeroByIdInDatabase(id, { name, industry, description, image_data });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No hero found with the provided ID' });
        }

        res.status(200).json({ message: 'Hero updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteHeroById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: `ID parameter is missing or invalid` });
        }

        const get_result = await getHeroByIdFromDatabase(id);
        if (get_result.length === 0) {
            return res.status(200).json({ message: `No data found for the provided ID` });
        }

        await deleteHeroByIdFromDatabase(id);

        res.status(200).json({ message: `Hero with id: ${id} deleted successfully` });
    } catch (error) {
        next(error);
    }
};

export const deleteHeroes = async (req, res, next) => {
    try {
        await deleteHeroesFromDatabase();

        res.status(200).json({ message: `Deleted all heroes successfully` });
    } catch (error) {
        next(error);
    }
};
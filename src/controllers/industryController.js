import { getIndustriesFromDatabase, getIndustryByIdFromDatabase, createIndustryInDatabase, updateIndustryByIdInDatabase, deleteIndustryByIdFromDatabase, deleteIndustriesFromDatabase } from '../services/industryService.js';

export const getIndustries = async (req, res, next) => {
    try {
        const result = await getIndustriesFromDatabase();
        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
};

export const getIndustryById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: 'ID parameter is missing or invalid' });
        }

        const result = await getIndustryByIdFromDatabase(id);
        if (!result) {
            return res.status(404).json({ message: 'No industry found for the provided ID' });
        }

        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
};

export const createIndustry = async (req, res, next) => {
    try {
        const result = await createIndustryInDatabase(req.body);
        res.status(201).json(result);
    } catch(error) {
        next(error);
    }
};

export const updateIndustryById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: 'ID parameter is missing or invalid' });
        }

        const result = await updateIndustryByIdInDatabase(id, req.body);
        if (!result) {
            return res.status(404).json({ message: 'No industry found with the provided ID' });
        }

        res.status(200).json({ message: 'Industry updated successfully' });
    } catch(error) {
        next(error);
    }
};

export const deleteIndustryById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: 'ID parameter is missing or invalid' });
        }

        const result = await deleteIndustryByIdFromDatabase(id);
        if (!result) {
            return res.status(404).json({ message: 'No industry found with the provided ID' });
        }

        res.status(200).json({ message: `Industry with ID ${id} deleted successfully` });
    } catch(error) {
        next(error);
    }
};

export const deleteIndustries = async (req, res, next) => {
    try {
        await deleteIndustriesFromDatabase();
        res.status(200).json({ message: 'Deleted all industries successfully' });
    } catch(error) {
        next(error);
    }
};

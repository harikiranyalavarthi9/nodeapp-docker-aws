import express from 'express';
import {
    getIndustries,
    getIndustryById,
    createIndustry,
    updateIndustryById,
    deleteIndustryById,
    deleteIndustries
} from '../controllers/industryController.js';

const router = express.Router();

// Routes for CRUD operations on industries
router.route('/')
    .get(getIndustries)           // Retrieve all industries
    .post(createIndustry);        // Create a new industry

router.route('/:id')
    .get(getIndustryById)         // Retrieve a specific industry by ID
    .put(updateIndustryById)      // Update a specific industry by ID
    .delete(deleteIndustryById);  // Delete a specific industry by ID

// Route to delete all industries
router.delete('/', deleteIndustries);

export default router;
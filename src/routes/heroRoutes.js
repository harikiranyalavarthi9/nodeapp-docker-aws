import express from 'express';
import {
    getHeroes,
    getHeroById,
    createHero,
    updateHeroById,
    deleteHeroById,
    deleteHeroes
} from '../controllers/heroController.js';

const router = express.Router();

// Define routes for CRUD operations on heroes
router.route('/')
    .get(getHeroes)     // Retrieve all heroes
    .post(createHero);  // Create a new hero

router.route('/:id')
    .get(getHeroById)         // Retrieve a specific hero by ID
    .put(updateHeroById)      // Update a specific hero by ID
    .delete(deleteHeroById);  // Delete a specific hero by ID

// Define a route to delete all heroes
router.delete('/', deleteHeroes);

export default router;

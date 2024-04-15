import express from 'express';
import { getHeroes, getHeroById, createHero, updateHeroById, deleteHeroById, deleteHeroes } from '../controllers/heroController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Valid starting endpoint' });
});

router.get('/heroes', getHeroes);
router.get('/heroes/:id', getHeroById);
router.post('/heroes', createHero);
router.put('/heroes/:id', updateHeroById);
router.delete('/heroes/:id', deleteHeroById);
router.delete('/heroes', deleteHeroes);

export default router;
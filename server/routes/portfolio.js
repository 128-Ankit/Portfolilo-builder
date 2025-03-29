const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { 
    getPortfolioByUserId, 
    getPortfolioById, 
    savePortfolio, 
    createPortfolio, 
    getUserPortfolio } = require('../controllers/portfolioController');

router.post('/', createPortfolio);
router.get('/:userId', getPortfolioByUserId);
router.get('/get/:id', getPortfolioById);
router.put('/:id', authMiddleware, savePortfolio);
router.get('/', getUserPortfolio);

module.exports = router;
const express = require('express');
const router = express.Router();
const { getPortfolioById, savePortfolio, createPortfolio, getUserPortfolio } = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/auth');

router.post('/', createPortfolio);
router.get('/:userId', getPortfolioById);
router.post('/save', authMiddleware, savePortfolio);
router.get('/', getUserPortfolio);

module.exports = router;
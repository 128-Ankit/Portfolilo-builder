const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/auth');

router.post('/', portfolioController.createPortfolio);
router.get('/:userId', portfolioController.getPortfolioById);
router.post('/save', authMiddleware, portfolioController.savePortfolio);
router.get('/', portfolioController.getUserPortfolio);

module.exports = router;
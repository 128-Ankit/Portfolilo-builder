const Portfolio = require('../models/Portfolio');

exports.getPortfolioById = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ userId: req.params.userId });
        if (!portfolio) {
            return res.json({}); // Return empty object for non-existent portfolio
        }
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.savePortfolio = async (req, res) => {
    try {
        const portfolioData = {
            ...req.body,
            userId: req.user.userId,
            updatedAt: Date.now()
        };

        const portfolio = await Portfolio.findOneAndUpdate(
            { userId: req.user.userId },
            portfolioData,
            { upsert: true, new: true, runValidators: true }
        );

        const portfolioUrl = `${process.env.BASE_URL}/${req.user.userId}`;
        res.json({ url: portfolioUrl, portfolio });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createPortfolio = async (req, res) => {
    const {home, about, services, projects, contact} = req.body;
    try {
        const newPortfolio = new Portfolio({
            home,
            about,
            services,
            projects,
            contact
        });

        const savedPortfolio = await newPortfolio.save();
        res.status(201).json({
            success: true,
            _id: savedPortfolio.id,
            portfolio: savedPortfolio
        });
    } catch (error) {
        console.error('Portfolio create error:', error);
        res.status(500).json({
            error: 'Failed to create portfolio',
            message: error.message
        });
    }
}

exports.getUserPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.find();

        if (!portfolio) {
            return res.json({ messages: "No posrtfolio found." });
        }

        res.json(portfolio);
    } catch (error) {
        console.error('Portfolio fetch error:', error);
        res.status(500).json({
            error: 'Failed to fetch portfolio',
            message: error.message
        });
    }
};
const Portfolio = require('../models/Portfolio');

const getPortfolioByUserId = async (req, res) => {
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

const getPortfolioById = async (req, res) => {
    const { id } = req.params;

    // Validate id
    if (!id) {
        console.log('Missing portfolio ID');
        return res.status(400).json({ error: 'Portfolio ID is required' });
    }

    try {
        console.log('Attempting to find portfolio with ID:', id);

        const portfolio = await Portfolio.findById(id);
        console.log('Database response:', portfolio);

        if (!portfolio) {
            console.log('No portfolio found with ID:', id);
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        console.log('Portfolio found:', portfolio);
        return res.status(200).json(portfolio);

    } catch (error) {
        console.error('Error fetching portfolio:', error);

        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid portfolio ID format' });
        }

        return res.status(500).json({
            error: 'Server error',
            details: error.message
        });
    }
};

const createPortfolio = async (req, res) => {
    const { home, about, services, projects, contact } = req.body;
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

const savePortfolio = async (req, res) => {
    try {
        const portfolioData = {
            ...req.body,
            updatedAt: Date.now()
        };
        const { id } = req.params;
        console.log("id: ", id);
        const portfolio = await Portfolio.findByIdAndUpdate(
            id,
            portfolioData,
            { new: true, runValidators: true }
        );

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        const portfolioUrl = `${process.env.BASE_URL}/${portfolio._id}`;
        res.json({ url: portfolioUrl, portfolio });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getUserPortfolio = async (req, res) => {
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

module.exports = { getPortfolioByUserId, getPortfolioById, savePortfolio, createPortfolio, getUserPortfolio };
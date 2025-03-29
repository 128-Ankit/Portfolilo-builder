const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    home: {
        title: { type: String, default: 'Welcome to My Portfolio' },
        description: { type: String, default: 'This is a brief introduction to who I am and what I do.' }
    },
    about: {
        bio: { type: String, default: 'I am a passionate individual with skills in various areas. This is my story.' },
        image: { type: String, default: '' }
    },
    services: [{
        title: { type: String, default: 'Service Title' },
        description: { type: String, default: 'Description of the service I offer.' }
    }],
    projects: [{
        title: { type: String, default: 'Project Title' },
        description: { type: String, default: 'Description of this amazing project.' },
        image: { type: String, default: '' }
    }],
    contact: {
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        socialLinks: {
            twitter: { type: String, default: '' },
            linkedin: { type: String, default: '' },
            github: { type: String, default: '' }
        }
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Set default services and projects arrays if not provided
portfolioSchema.pre('save', function (next) {
    if (!this.services.length) {
        this.services = [{ title: 'Service 1', description: 'Default service description' }];
    }
    if (!this.projects.length) {
        this.projects = [{ title: 'Project 1', description: 'Default project description' }];
    }
    next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
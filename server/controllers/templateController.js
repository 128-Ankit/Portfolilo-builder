import asyncHandler from 'express-async-handler';
import Template from '../models/Template.js';

// @desc    Get all templates
// @route   GET /api/templates
// @access  Public
const getTemplates = asyncHandler(async (req, res) => {
    const category = req.query.category;
    const query = category ? { category } : {};

    const templates = await Template.find(query);
    res.json(templates);
});

// @desc    Get template by ID
// @route   GET /api/templates/:id
// @access  Public
const getTemplateById = asyncHandler(async (req, res) => {
    const template = await Template.findById(req.params.id);

    if (template) {
        res.json(template);
    } else {
        res.status(404);
        throw new Error('Template not found');
    }
});

// @desc    Create a template
// @route   POST /api/templates
// @access  Private/Admin
const createTemplate = asyncHandler(async (req, res) => {
    const { name, description, sections, theme, category, isDefault, thumbnail } = req.body;

    const template = await Template.create({
        name,
        description,
        sections: sections || [],
        theme: theme || {
            primaryColor: '#4A90E2',
            secondaryColor: '#50E3C2',
            fontFamily: 'Roboto',
            fontSize: '16px',
            backgroundColor: '#FFFFFF',
            textColor: '#333333'
        },
        category: category || 'professional',
        isDefault: isDefault || false,
        thumbnail
    });

    if (template) {
        res.status(201).json(template);
    } else {
        res.status(400);
        throw new Error('Invalid template data');
    }
});

// @desc    Update template
// @route   PUT /api/templates/:id
// @access  Private/Admin
const updateTemplate = asyncHandler(async (req, res) => {
    const template = await Template.findById(req.params.id);

    if (template) {
        template.name = req.body.name || template.name;
        template.description = req.body.description || template.description;
        template.sections = req.body.sections || template.sections;
        template.theme = req.body.theme || template.theme;
        template.category = req.body.category || template.category;
        template.isDefault = req.body.isDefault !== undefined ? req.body.isDefault : template.isDefault;
        template.thumbnail = req.body.thumbnail || template.thumbnail;

        const updatedTemplate = await template.save();
        res.json(updatedTemplate);
    } else {
        res.status(404);
        throw new Error('Template not found');
    }
});

export { getTemplates, getTemplateById, createTemplate, updateTemplate };
const { response } = require('../app');
const db = require('../models/index');
const Category = db.Category;

const getAllCategories = async (req, res = response) => {
    const categories = await Category.findAll();
    res.status(200).json({
        ok: true,
        data: categories
    })
}

const getCategoryById = async (req, res = response) => {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) return res.json({ msg: 'Category not found.' });

    res.json({
        ok: true,
        data: category
    })
}

const postCategory = async (req, res = response) => {
    const { name, description, image } = req.body;

    const category = await Category.create({ name, description, image });
    res.status(200).json({
        ok: true,
        data: category
    })
}

const putCategory = async (req, res = resonse) => {
    const { id } = req.params;
    const { name, description, image } = req.body;
    
    const category = await Category.findByPk(id);
    if (!category) return res.json({ msg: 'Category not found.' })

    if (name) category.name = name;
    if (description) category.description = description;
    if (image) category.image = image;

    await category.save();
    res.status(200).json({
        ok: true,
        data: category
    })
}

const deleteCategory = async (req, res = response) => {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) return res.json({ msg: 'Category not found.' });

    category.destroy();
    res.status(200).json({
        ok: true,
        data: category
    })
}

module.exports = {
    getAllCategories,
    getCategoryById,
    postCategory,
    putCategory,
    deleteCategory
}
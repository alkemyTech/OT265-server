const db = require('../models/index');
const Category = db.Category;

class CategoryController {

    async get(req, res) {
        const categories = await Category.findAll({
            attributes: ["name"]
        });

        res.status(200).json({
            ok: true,
            data: categories
        })
    }

    async getOne(req, res) {
        const { id } = req.params;

        const category = await Category.findByPk(id, {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt']
            }
        });

        if (!category) return res.status(404).json({ msg: 'Category not found.' });

        res.json({
            ok: true,
            data: category
        })
    }

    async create(req, res) {
        const { name, description, image } = req.body;

        const category = await Category.create({ name, description, image });
        res.status(200).json({
            ok: true,
            data: category
        })
    }

    async update(req, res = resonse) {
        const { id } = req.params;
        const { name, description, image } = req.body;

        const category = await Category.findByPk(id, {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt']
            }
        });

        if (!category) return res.status(404).json({ msg: 'Category not found.' })

        if (name) category.name = name;
        if (description) category.description = description;
        if (image) category.image = image;

        await category.save();
        res.status(200).json({
            ok: true,
            data: category
        })
    }

    async delete(req, res = response) {
        const { id } = req.params;

        const category = await Category.findByPk(id, {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt']
            }
        });
        
        if (!category) return res.status(404).json({ msg: 'Category not found.' });

        category.destroy();
        res.status(200).json({
            ok: true,
            data: category
        })
    }

}

module.exports = new CategoryController();
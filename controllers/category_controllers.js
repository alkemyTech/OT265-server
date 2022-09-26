const db = require('../models/index');
const Category = db.Category;

class CategoryController {

    async get(req, res) {
        const { page } = req.query;
        let currentPage = page ? Number.parseInt(page) : 1;
        let pageLimit = 10;
        let currentUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

        const categories = await Category.findAndCountAll({
            attributes: ["name"],
            limit: pageLimit,
            offset: (currentPage * pageLimit) - pageLimit
        });

        if (!categories.count) {
            return res.json({
            success: false,
            message: 'No categories have been created yet'
        })} else if(categories.count && !categories.rows.length) {
            return res.json({
                success: false,
                message: 'Invalid page.'
            })
        };

        const nextPage = !page ? `${currentUrl}?page=2` : currentUrl.replace(`page=${page}`, `page=${currentPage + 1}`);
        const previousPage = `${currentUrl.replace(`page=${page}`, `page=${currentPage - 1}`)}`;

        const response = {
            ok: true,
            totalPages: Math.ceil(categories.count / pageLimit),
            next: nextPage,
            previous: previousPage,
            data: categories.rows,
        };

        if(page >= categories.count / pageLimit) response.next = null
        if(!page || page - 1 <= 0) response.previous = null
        
        res.status(200).json(response)
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
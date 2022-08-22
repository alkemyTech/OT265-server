const db = require('../models/index.js');
const Activity = db.Activity;

class ActivityController {

    async get(req, res) {
        const activities = await Activity.findAll({
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt']
            }
        });

        res.status(200).json({
            ok: true,
            data: activities
        })
    }

    async getOne(req, res) {
        const { id } = req.params;
        const activity = await Activity.findByPk(id, {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt']
            }
        });

        if (!activity) return res.json({ msg: 'Activity not found.' });

        res.status(200).json({
            ok: true,
            data: activity
        })
    }

    async create(req, res) {
        const { name, content, image } = req.body;
        const activity = await Activity.create({ name, content, image });

        res.status(200).json({
            ok: true,
            data: activity
        })
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, content, image } = req.body;

        const activity = await Activity.findByPk(id, {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt']
            }
        });

        if (!activity) return res.json({ msg: 'Activity not found.' });

        if (name) activity.name = name;
        if (content) activity.content = content;
        if (image) activity.image = image;

        await activity.save();

        res.status(200).json({
            ok: true,
            data: activity
        })
    }

    async delete(req, res) {
        const { id } = req.params;

        const activity = await Activity.findByPk(id, {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt']
            }
        });

        if (!activity) return res.json({ msg: 'Activity not found.' });

        activity.destroy();

        res.status(200).json({
            ok: true,
            data: activity
        })
    }

}

module.exports = new ActivityController();
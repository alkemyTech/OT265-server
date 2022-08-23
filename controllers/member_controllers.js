const db = require('../models/index.js')
const Member = db.Member

class MemberController {

    async get(req, res) {
        const members = await Member.findAll({
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt']
            }
        });

        if (!members) return res.json({ msg: 'There are no members yet.' })

        res.status(200).json({
            ok: true,
            data: members
        })
    }

    async getOne(req, res) {
        const { id } = req.params;
        const member = await Member.findByPk(id, {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt']
            }
        });

        if (!member) return res.status(400).json({ msg: `Member not found.` })

        res.status(200).json({
            ok: true,
            data: member
        })
    }

    async create(req, res) {
        const {
            name,
            facebookUrl,
            instagramUrl,
            linkedinUrl,
            description
        } = req.body;

        const member = await Member.create({ name, facebookUrl, instagramUrl, linkedinUrl, description });

        // It is required to implement the AWS S3 service to upload the image.

        res.status(200).json({
            ok: true,
            data: member
        })
    }

    async update(req, res) {
        const { id } = req.params;
        const {
            name,
            facebookUrl,
            instagramUrl,
            linkedinUrl,
            description
        } = req.body;

        const member = await Member.findByPk(id, {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt']
            }
        });

        if (!member) return res.json({ msg: 'Member not found.' })

        if (name) member.name = name;
        if (facebookUrl) member.facebookUrl = facebookUrl;
        if (instagramUrl) member.instagramUrl = instagramUrl;
        if (linkedinUrl) member.linkedinUrl = linkedinUrl;
        if (description) member.description = description;
        // It is required to implement the AWS S3 service to upload the image.
        await member.save();

        res.status(200).json({
            ok: true,
            data: member
        })
    }

    async delete(req, res) {
        const { id } = req.params;

        const member = await Member.findByPk(id, {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt']
            }
        });

        if (!member) return res.json({ msg: 'Member not found.' })

        member.destroy();

        res.status(200).json({
            ok: true,
            data: member
        })
    }

}

module.exports = new MemberController();
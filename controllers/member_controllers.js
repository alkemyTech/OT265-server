const db = require('../models/index.js')
const Member = db.Member
const { uploadImage } = require('../services/uploadImages')   


class MemberController {

    async get(req, res) {
        const { page } = req.query;
        let currentPage = page ? Number.parseInt(page) : 1
        let pageLimit = 10;
        let currentUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

        const members = await Member.findAndCountAll({
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt']
            },
            limit: pageLimit,
            offset: (currentPage * pageLimit) - pageLimit
        });

        if (!members.count) {
            return res.json({
            success: false,
            message: 'No members have been created yet'
        })} else if(members.count && !members.rows.length) {
            return res.json({
            success: false,
            message: 'Invalid page.'
        })};

        const nextPage = !page ? `${currentUrl}?page=2` : currentUrl.replace(`page=${page}`, `page=${currentPage + 1}`);
        const previousPage = `${currentUrl.replace(`page=${page}`, `page=${currentPage - 1}`)}`;

        const response = {
            ok: true,
            totalPages: members.count / pageLimit,
            next: nextPage,
            previous: previousPage,
            data: members.rows,
        };

        if(page >= members.count / pageLimit) response.next = null
        if(!page || page - 1 <= 0) response.previous = null
        res.status(200).json(response)
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
        // AWS S3 IMAGE SERVICE CHECK
        let imgUrl = ''
        if (req.files) {
            const { image } = req.files;
            imgUrl = await uploadImage(image);
            if (imgUrl === '') return res.status(403).send({
                success: false,
                message: 'invalid image format',
                image: `${image}`
            });
        }
        await Member.create({ name, facebookUrl, instagramUrl, linkedinUrl, description, image: imgUrl });
        res.status(200).json({
            success: true,
            message: 'Member created successfully'
        });
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

        if (!member) return res.json({
            success: false,
            message: `The member id: ${id} doesn't exist`
        });

        if (name) member.name = name;
        if (facebookUrl) member.facebookUrl = facebookUrl;
        if (instagramUrl) member.instagramUrl = instagramUrl;
        if (linkedinUrl) member.linkedinUrl = linkedinUrl;
        if (description) member.description = description;
        // AWS S3 IMAGE SERVICE CHECK
        if (req.files) {
            let imgUrl = ''
            const { image } = req.files;
            imgUrl = await uploadImage(image);
            if (imgUrl === '') return res.status(403).send({
                success: false,
                message: 'invalid image format',
                image: `${image}`
            });
            member.image = imgUrl;
        }
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
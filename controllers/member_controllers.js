const { response } = require('express');
const db = require('../models/index.js')
const Member = db.Member

const getAllMembers = async (req, res = response) => {
    const members = await Member.findAll();
    if (!members) {
        return res.json({
            msg: 'There are no members yet.'
        })
    }

    res.status(200).json({
        ok: true,
        data: members
    })
}

const getMemberById = async (req, res = response) => {
    const { id } = req.params;
    const member = await Member.findByPk(id);

    if (!member) return res.status(400).json({ msg: `Member not found.` })

    res.status(200).json({
        ok: true,
        data: member
    })
}

const postMember = async (req, res = response) => {
    const { name, facebookUrl, instagramUrl, linkedinUrl, description, image } = req.body;
    const member = await Member.create({ name, facebookUrl, instagramUrl, linkedinUrl, description, image });

    res.status(200).json({
        ok: true,
        data: member
    })
}

const putMember = async (req, res = response) => {
    const { id } = req.params;
    const { name, facebookUrl, instagramUrl, linkedinUrl, description } = req.body;

    const member = await Member.findByPk(id);
    if (!member) return res.json({ msg: 'Member not found.' })

    if (name) member.name = name;
    if (facebookUrl) member.facebookUrl = facebookUrl;
    if (instagramUrl) member.instagramUrl = instagramUrl;
    if (linkedinUrl) member.linkedinUrl = linkedinUrl;
    if (description) member.description = description;

    await member.save();

    res.status(200).json({
        ok: true,
        data: member
    })
}

const deleteMember = async (req, res = response) => {
    const { id } = req.params;

    const member = await Member.findByPk(id)
    if (!member) return res.json({ msg: 'Member not found.' })

    member.destroy();

    res.status(200).json({
        ok: true,
        data: member
    })
}

module.exports = {
    getAllMembers,
    getMemberById,
    postMember,
    putMember,
    deleteMember
}
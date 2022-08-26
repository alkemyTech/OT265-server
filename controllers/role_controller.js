const db = require('../models/index.js');
const Role = db.Role;

const getAllRoles = async (req, res = response) => {
    const roles = await Role.findAll();

    res.status(200).json({
        ok: true,
        data: roles
    })
}

const getRoleById = async (req, res = response) => {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) return res.json({msg: 'Role not found.'});

    res.status(200).json({
        ok: true,
        data: role
    })
}

const postRole = async (req, res = response) => {
    const { name, description } = req.body;
    const role = await Role.create({ name, description });

    res.status(200).json({
        ok: true,
        data: role
    })
}

const putRole = async (req, res = response) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const role = await Role.findByPk(id);
    if (!role) return res.json({msg: 'Role not found.'});

    if(name) role.name = name;
    if(description) role.description = description;
         

    await role.save();

    res.status(200).json({
        ok: true,
        data: role
    })
}

const deleteRole = async (req, res = response) => {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    role.destroy();

    res.status(200).json({
        ok: true,
        data: role
    })
}

module.exports = {
    getAllRoles,
    getRoleById,
    postRole,
    putRole,
    deleteRole
}
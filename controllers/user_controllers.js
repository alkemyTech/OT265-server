
const db = require('../models/index');
const User = db.User;

const getAllUsers = async (req, res) => {
	const users = await User.findAll();
	res.status(200).json({ data: users })
}

const getUserById = async (req, res) => {
	const { id } = req.params;

	const user = await User.findByPk(id);
	if (!user) return res.status(400).json({ msg: 'User not found.' });

	res.json({ data: user })
}

const putUser = async (req, res = resonse) => {
	const { id } = req.params;
	let { firstName, lastName, email, password, photo, roleId } = req.body;

	const user = await User.findByPk(id);
	if (!user) return res.status(404).json({ msg: 'User not found.' })

	if (password) {
		const salt = bcryptjs.genSaltSync();
		password = bcryptjs.hashSync(password, salt);
		user.password = password
	}

	if (firstName) user.firstName = firstName;
	if (lastName) user.lastName = lastName;
	if (email) user.email = email;
	if (photo) user.photo = photo;
	if (roleId) user.roleId = roleId;

	await user.save();
	res.status(200).json({ data: user })
}

const deleteUser = async (req, res) => {
	const { id } = req.params;

	const user = await User.findByPk(id);
	if (!user) return res.json({ msg: 'User not found.' });

	user.deletedAt = new Date().toLocaleDateString();
	await user.save();

	res.status(200).json({ data: user })
}

module.exports = {
	getAllUsers,
	getUserById,
	putUser,
	deleteUser
}   
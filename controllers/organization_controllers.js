const db = require('../models/index');
const Organization = db.Organization;

const getAllOrganizations = async (req, res) => {
	const organizations = await Organization.findAll({
		attributes: ["name","image","phone","address"]
	});
	res.status(200).json({ data: organizations })
}

const getOrganizationById = async (req, res) => {
	const { id } = req.params;

	const organization = await Organization.findByPk(id);
	if (!organization) return res.status(400).json({ msg: 'Organization not found.' });

	res.json({ data: organization })
}

const postOrganization = async (req, res) => {
	const { name, image, address, phone, email, welcomeText, aboutUsText } = req.body;

	const organization = await Organization.create({ name, image, address, phone, email, welcomeText, aboutUsText });
	res.status(200).json({ data: organization })
}

const putOrganization = async (req, res = resonse) => {
	const { id } = req.params;
	const { name, image, address, phone, email, welcomeText, aboutUsText } = req.body;

	const organization = await Organization.findByPk(id);
	if (!organization) return res.status(400).json({ msg: 'Organization not found.' })

	if (name) organization.name = name;
	if (image) organization.image = image;
	if (address) organization.conent = address;
	if (phone) organization.conent = phone;
	if (email) organization.conent = email;
	if (welcomeText) organization.conent = welcomeText;
	if (aboutUsText) organization.conent = aboutUsText;

	await organization.save();
	res.status(200).json({ data: organization })
}

const deleteOrganization = async (req, res) => {
	const { id } = req.params;

	const organization = await Organization.findByPk(id);
	if (!organization) return res.json({ msg: 'Organization not found.' });

	organization.deletedAt = new Date().toLocaleDateString();
	await organization.save();

	res.status(200).json({ data: organization })
}

module.exports = {
	getAllOrganizations,
	getOrganizationById,
	postOrganization,
	putOrganization,
	deleteOrganization
}  
const db = require('../models/index');
const slide = db.Slide;
const Organization = db.Organization;

const getAllOrganizations = async (req, res) => {
	const organizations = await Organization.findAll({
		attributes: [ "id", "name","image","phone","address", "facebook", "linkedin", "instagram"]
	});
	res.status(200).json({ data: organizations })
}

const getOrganizationById = async (req, res) => {
	const {id}  =  req.params;

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
	const { name, image, address, phone, email, welcomeText, aboutUsText, facebook, linkedin, instagram } = req.body;

	const organization = await Organization.findByPk(Number(1));

	if (name) organization.name = name;
	if (image) organization.image = image;
	if (address) organization.address = address;
	if (phone) organization.phone = phone;
	if (email) organization.email = email;
	if (welcomeText) organization.welcomeText = welcomeText;
	if (aboutUsText) organization.aboutUsText = aboutUsText;
	if (facebook) organization.facebook = facebook;
	if (linkedin) organization.linkedin = linkedin;
	if (instagram) organization.instagram = instagram;

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
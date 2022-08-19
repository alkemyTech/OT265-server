const { response } = require('../app');
const db = require('../models/index');
const Testimonial = db.Testomonial;

const getAllTestimonials = async (req, res = response) => {
	const testimonials = await Testimonial.findAll();
	res.status(200).json({ data: testimonials })
}

const getTestimonialById = async (req, res = response) => {
	const { id } = req.params;

	const testimonial = await Testimonial.findByPk(id);
	if (!testimonial) return res.status(400).json({ msg: 'Testimonial not found.' });

	res.json({ data: testimonial })
}

const postTestimonial = async (req, res = response) => {
	const { name, content, image } = req.body;

	const testimonial = await Testimonial.create({ name, content, image });
	res.status(200).json({ data: testimonial })
}

const putTestimonial = async (req, res = resonse) => {
	const { id } = req.params;
	const { name, content, image } = req.body;

	const testimonial = await Testimonial.findByPk(id);
	if (!testimonial) return res.status(400).json({ msg: 'Testimonial not found.' })

	if (name) testimonial.name = name;
	if (content) testimonial.conent = content;
	if (image) testimonial.image = image;

	await Testimonial.save();
	res.status(200).json({ data: testimonial })
}

const deleteTestimonial = async (req, res = response) => {
	const { id } = req.params;

	const testimonial = await Testimonial.findByPk(id);
	if (!testimonial) return res.json({ msg: 'Testimonial not found.' });

	testimonial.deletedAt = new Date().toLocaleDateString();
	await testimonial.save();

	res.status(200).json({ data: testimonial })
}

module.exports = {
	getAllTestimonials,
	getTestimonialById,
	postTestimonial,
	putTestimonial,
	deleteTestimonial
} 

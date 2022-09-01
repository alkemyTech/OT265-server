const db = require('../models/index');
const Testimonial = db.Testimonial;
const { uploadImage } = require('../services/uploadImages')

const getAllTestimonials = async (req, res) => {
	try {
		const testimonials = await Testimonial.findAll();
		res.status(200).json({
			success: true,
			testimonials: testimonials
		})
	} catch (err) {
		res.status(400).send({
			error: true,
			message: err.message,
		})
	}
}

const getTestimonialById = async (req, res) => {
	const { id } = req.params;

	const testimonial = await Testimonial.findByPk(id);
	if (!testimonial) return res.status(400).json({
		success: false,
		message: `The testimonial ID: ${id} doesn't exist`
	});

	res.json({
		success: true,
		data: testimonial
	})
}

const postTestimonial = async (req, res) => {
	try {
		const { name, content } = req.body;

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

		await Testimonial.create({ name, content, image: imgUrl });

		res.status(200).json({
			success: true,
			message: 'Testimonial created successfully'
		})
	} catch (err) {
		res.status(400).send({
			error: true,
			message: err.message,
		})
	}
}

const putTestimonial = async (req, res) => {
	const { id } = req.params;
	const { name, content, image } = req.body;

	const testimonial = await Testimonial.findByPk(id);
	if (!testimonial) return res.status(400).json({ msg: 'Testimonial not found.' })

	if (name) testimonial.name = name;
	if (content) testimonial.conent = content;
	if (image) testimonial.image = image;

	await testimonial.save();
	res.status(200).json({ data: testimonial })
}

const deleteTestimonial = async (req, res) => {
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

const db = require('../models/index');
const Testimonial = db.Testimonials;
const { uploadImage } = require('../services/uploadImages');
const member_controllers = require('./member_controllers');

const getAllTestimonials = async (req, res) => {
	try {
		const { page } = req.query;
		let currentPage = page ? Number.parseInt(page) : 1
		let pageLimit = 10;
		let currentUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
	
		const allTestimonials = await Testimonial.findAndCountAll({
			attributes: {
				exclude: ['deletedAt', 'createdAt', 'updatedAt']
			},
			limit: pageLimit,
			offset: (currentPage * pageLimit) - pageLimit
		});
	
		if (!allTestimonials.count) {
			return res.json({
			success: false,
			message: 'No testimonials have been created yet'
		})} else if(allTestimonials.count && !allTestimonials.rows.length) {
			return res.json({
			success: false,
			message: 'Invalid page.'
		})};
	
		const nextPage = !page ? `${currentUrl}?page=2` : currentUrl.replace(`page=${page}`, `page=${currentPage + 1}`);
		const previousPage = `${currentUrl.replace(`page=${page}`, `page=${currentPage - 1}`)}`;
	
		const response = {
			ok: true,
			totalPages: Math.ceil(allTestimonials.count / pageLimit),
			next: nextPage,
			previous: previousPage,
			data: allTestimonials.rows,
		};
	
		if(page >= allTestimonials.count / pageLimit) response.next = null
		if(!page || page - 1 <= 0) response.previous = null
		res.status(200).json(response)
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
	try {
		const { id } = req.params;
		const { name, content } = req.body;

		const testimonial = await Testimonial.findByPk(id);
		if (!testimonial) return res.status(400).json({
			success: false,
			message: `Testimonial ID: ${id} doesn't exist`
		})

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

		if (name) testimonial.name = name;
		if (content) testimonial.conent = content;
		if (req.files) testimonial.image = img;

		await testimonial.save();
		res.status(200).json({
			success: true,
			data: testimonial
		})
	} catch (err) {
		res.status(400).send({
			error: true,
			message: err.message,
		})
	}
}

const deleteTestimonial = async (req, res) => {
	try {

		const { id } = req.params;

		const testimonial = await Testimonial.findByPk(id);
		if (!testimonial) return res.status(400).json({
			success: false,
			message: `Testimonial ID: ${id} doesn't exist`
		});

		testimonial.destroy();

		res.status(200).json({
			success: true,
			message: "Testimonial deleted successfully",
			data: testimonial
		})
	} catch (err) {
		res.status(400).send({
			error: true,
			message: err.message,
		})
	}
}

module.exports = {
	getAllTestimonials,
	getTestimonialById,
	postTestimonial,
	putTestimonial,
	deleteTestimonial
} 

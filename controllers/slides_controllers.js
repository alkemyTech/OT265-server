const db = require('../models/index');
const Slide = db.Slide;

const listarSlides = async (req, res) => {
    const slides = await Slide.findAll();
    res.json({ slides })
}

module.exports = {
    listarSlides
}
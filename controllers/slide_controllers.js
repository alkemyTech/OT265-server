const db = require('../models/index.js')
const Slide = db.Slide

const slideDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const findId = await Slide.findByPk(id);
        if (!findId) return res.status(404).send({
            success: false,
            message: `The slide Id: ${id} doesn't exist`
        });
        res.send({
            success: true,
            data: findId
        })

    } catch (err) {
        res.status(400).send({
            error: true,
            message: err.message
        })
    }
}

module.exports = {
    slideDetails
}
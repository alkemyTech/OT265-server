
const db = require('../models/index');
const Slide = db.Slide;

const editSlide = async (req, res) => {
    const { id } = req.params;
    const { imageUrl, text, order, organizationId } = req.body;
    
    const slide = await Slide.findByPk( id, {
        attributes: {
            exclude: [ 'createdAt', 'updatedAt']
        }
    } );

    if(!slide){
        return res.status(400).json({
            ok: false,
            msg: `No existe el slide con ID: ${ id }.`
        })
    }

    if(imageUrl) slide.imageUrl = imageUrl;
    if (text) slide.text = text;
    if (order) slide.order = order;
    if (organizationId) slide.organizationId = organizationId;

    await slide.save();

    res.json({
        ok: true,
        data: slide,
        msg: `El Slide con ID: ${ id } ha sido actualizado con exito.`
    })
}

module.exports = {
    editSlide
}
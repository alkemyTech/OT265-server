              <<<<<<< feature/ot265-endpoint-delete-slides-by-id

const db = require('../models/index');
    
const Slide = db.Slide;

const deleteSlide = async (req, res) => {
    const { id } = req.params;
    const slide = await Slide.findByPk( id );

    if(!slide){
        return res.status(400).json({
            ok: false,
            msg: `No existe el slide con ID: ${ id }.`
        })
    }

    slide.destroy();

    res.json({
        ok: true,
        msg: `El Slide con ID: ${ id } ha sido eliminado con exito.`
    })
}

module.exports = {
    deleteSlide,
    listarSlides

}
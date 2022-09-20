const { uploadFile } = require("../helpers/aws-s3");
const db = require("../models/index");

const Slide = db.Slide;

const editSlide = async (req, res) => {
  const { id } = req.params;

  const { imageUrl, text, order, organizationId } = req.body;

  const slide = await Slide.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  if (!slide) {
    return res.status(400).json({
      ok: false,
      msg: `No existe el slide con ID: ${id}.`,
    });
  }

  if (imageUrl) slide.imageUrl = imageUrl;
  if (text) slide.text = text;
  if (order) slide.order = order;
  if (organizationId) slide.organizationId = organizationId;

  await slide.save();

  res.json({
    ok: true,
    data: slide,
    msg: `El Slide con ID: ${id} ha sido actualizado con exito.`,
  });
};

const slideDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const findId = await Slide.findByPk(id);
    if (!findId)
      return res.status(404).send({
        success: false,
        message: `The slide Id: ${id} doesn't exist`,
      });
    res.send({
      success: true,
      data: findId,
    });
  } catch (err) {
    res.status(400).send({
      error: true,
      message: err.message,
    });
  }
};

const listarSlides = async (req, res) => {
  const slides = await Slide.findAll();
  res.json({ slides });
};

const deleteSlide = async (req, res) => {
  const { id } = req.params;

  const slide = await Slide.findByPk(id);

  if (!slide) {
    return res.status(400).json({
      ok: false,
      msg: `No existe el slide con ID: ${id}.`,
    });
  }
  slide.destroy();
  res.json({
    ok: true,
    msg: `El Slide con ID: ${id} ha sido eliminado con exito.`,
  });
};

const create_slide = async (req, res) => {
  try {
    //const image = require('../images/image')
    const { image, text, organizationId } = req.body;
    console.log(image)
    // let response = decodeBase64Image(image);
    // console.log(response);
    //decodea la imagen y devuelve response con tipo de extension y la imagen
    // console.log("HERE BE RESPONSE  ", response)
   /*  if (!res) return res.status(400).send({
      success: false,
      message: "Wrong file extension"
    }); */

    imgUrl = await uploadFile(image);
    
    if (imgUrl === '') return res.status(403).send({
      success: false,
      message: 'Image could not be found',
      image: `${image}`
    });

    if (!order) {
      var count = await Slide.count();
      count++;
    }

    await Slide.create(imageUrl = imgUrl, text, order ? order : order = count, organizationId);

    res.status(201).send({
      success: true,
      message: "Slide created successfully"
    })

  } catch (err) {
    res.status(500).send({
      error: true,
      message: err.message
    })
  }
}

module.exports = {
  editSlide,
  deleteSlide,
  listarSlides,
  slideDetails,
  create_slide
};
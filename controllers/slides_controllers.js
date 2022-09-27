const { uploadImage } = require("../services/uploadImages.js");
const db = require("../models/index");
const { decodeBase64Image } = require("../helpers/image-helpers");
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
    let { text, organizationId, image, order } = req.body;
    let { imageType, data } = await decodeBase64Image(image);

    let imgUrl = await uploadImage(data, imageType);
    if (!order) {
      order = await Slide.count();
      order++;
    }

    const slide = await Slide.create({
      imageUrl: imgUrl,
      text,
      order,
      organizationId,
    });
    res.status(201).send(slide);
  } catch (err) {
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};

module.exports = {
  editSlide,
  deleteSlide,
  listarSlides,
  slideDetails,
  create_slide,
};

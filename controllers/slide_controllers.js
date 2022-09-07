const db = require('../models/index.js')
const Slide = db.Slide
// const { decodeBase64Image } = require('../helpers/image-helpers');
const { response } = require('express');
const { uploadImage } = require('../services/uploadImages.js');

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



const create_slide = async (req, res) => {
    try {
        const image = require('../images/image')
        const { text, organizationId } = req.body;

        // let response = decodeBase64Image(image);
        // console.log(response);
        //decodea la imagen y devuelve response con tipo de extension y la imagen
        // console.log("HERE BE RESPONSE  ", response)
        if (!response) return res.status(400).send({
            success: false,
            message: "Wrong file extension"
        });

        imgUrl = await uploadImage(image);
        console.log(imgUrl);
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
    slideDetails,
    create_slide
}
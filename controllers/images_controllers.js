const { response } = require('express');
const { uploadFile } = require('../helpers/aws-s3')

const uploadImage = async (req, res = response) => {
    try {
        
        const bucket = process.env.AWS_BUCKET_NAME_IMAGES;
        const { file } = req.files;
        const fileExtension = file.name.split('.').pop();
        const allowedExtensions = ['png', 'gif', 'jpg'];

        if (!allowedExtensions.includes(fileExtension)) {
            return res.json({
                ok: false,
                msg: `The extension ".${fileExtension}" is not allowed.`
            })
        }

        const result = await uploadFile(bucket, file);

        res.json({
            ok: true,
            msg: 'Image uploaded successfully.',
            url: result.Location
        })

    } catch (err) {
        console.log(err);
        return res.json({ msg: `Error on images_controllers.js` })
    }
}

module.exports = {
    uploadImage
}
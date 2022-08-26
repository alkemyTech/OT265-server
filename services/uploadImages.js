const { uploadFile } = require('../helpers/aws-s3')

module.exports = {

    uploadImage: async (image) => {
        try {
            const bucket = process.env.AWS_BUCKET_NAME_IMAGES;
            const fileExtension = image.name.split('.').pop();
            const allowedExtensions = ['png', 'gif', 'jpg'];

            if (allowedExtensions.includes(fileExtension)) {
                const img = await uploadFile(bucket, image);
                return img;
            }

            return '';

        } catch (error) {
            console.log(error);
            return error
        }
    }

}
const { uploadFile } = require("../helpers/aws-s3");

module.exports = {
  uploadImage: async (image, fileExtension) => {
    try {
      const bucket = process.env.AWS_BUCKET_NAME_IMAGES;
      const allowedExtensions = ["png", "gif", "jpg", "jpeg"];

      if (allowedExtensions.includes(fileExtension)) {
        const img = await uploadFile(bucket, image, fileExtension);
        return img;
      }

      return "";
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

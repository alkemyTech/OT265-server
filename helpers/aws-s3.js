const S3 = require("aws-sdk/clients/s3");
const { uuid } = require("uuidv4");

const region = process.env.AWS_REGION;

const storage = new S3({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

module.exports = {
  uploadFile: async (bucketName, data, fileExtension) => {
    const key = `${uuid()}.${fileExtension}`;

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: data,
    };

    const uploadResult = await storage.upload(params).promise();
    return uploadResult.Location;
  },
};

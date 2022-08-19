const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const region = process.env.AWS_REGION;

const storage = new S3({
    region,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const uploadFile = (bucketName, file) => {
    const stream = fs.createReadStream(file.tempFilePath);
    const path = file.tempFilePath.split('-').pop();

    const params = {
        Bucket: bucketName,
        Key: `${path}-${file.name}`,
        Body: stream,
    };
    return storage.upload(params).promise();
}

module.exports = {
    uploadFile
};
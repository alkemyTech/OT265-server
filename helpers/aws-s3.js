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

module.exports = {

    uploadFile: (bucketName, file) => {
        const body = fs.createReadStream(file.tempFilePath);
        const path = file.tempFilePath.split('-').pop();
        const key = `${path}${file.name}`
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: body,
        };

        storage.upload(params).promise();

        const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`

        return url;
    }

}
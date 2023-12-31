const { S3Client } = require("@aws-sdk/client-s3");

const config = {
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
const client = new S3Client(config);
module.exports = client;

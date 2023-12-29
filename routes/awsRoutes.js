const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const corsMiddleware = require("../middlewares/corsMiddleware");

// console.log("starting AWS code");
// const awsPutCall = async () => {
//   try {
//     const config = {
//       region: "ap-south-1",
//       credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//       },
//     };
//     const client = new S3Client(config);

//     const input = {
//       Body: fs.createReadStream("./files/JPEG_example_flower.jpg"),
//       Bucket: "doculocker",
//       Key: "JPEG_example_flower.jpg",
//     };
//     const command = new PutObjectCommand(input);
//     const response = await client.send(command);
//   } catch (err) {
//     console.error("aws error", err);
//   } finally {
//     console.log("ending AWS code");
//   }
// };
// awsPutCall();
console.log(
  "====================================================================="
);
console.log(
  "====================================================================="
);
console.log(
  "====================================================================="
);
console.log(
  "====================================================================="
);
console.log(" corsMiddleware is ", corsMiddleware);
module.exports = (app) => {
  app.options("*", corsMiddleware);

  app.post("/api/uploadFile", corsMiddleware, (req, res) => {
    console.log("requesta", req.body);
    res.status(200).json({ message: "uploaded" });
  });
};

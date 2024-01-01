const { PutObjectCommand } = require("@aws-sdk/client-s3");
const mongoose = require("mongoose");
const { v4: uuidV4 } = require("uuid");
const corsMiddleware = require("../middlewares/corsMiddleware");
const upload = require("../middlewares/multer");
const client = require("../config/awsConfig");
const FileModel = mongoose.model("files");

// console.log("starting AWS code");
const awsPutCall = async (fileToBeUploaded) => {
  try {
    // const client = new S3Client(awsConfig);

    const input = {
      Body: fileToBeUploaded.buffer,
      Bucket: "doculocker",
      Key: fileToBeUploaded.id,
      Metadata: {
        mimetype: fileToBeUploaded.mimetype,
      },
    };
    // console.log("input 26", input);
    const command = new PutObjectCommand(input);
    const response = await client.send(command);
  } catch (err) {
    console.error("aws error", err);
  } finally {
    console.log("ending AWS code");
  }
};
// awsPutCall();
console.log(" corsMiddleware is ", corsMiddleware);
module.exports = (app) => {
  app.options("*", corsMiddleware);

  app.post(
    "/api/uploadFile",
    corsMiddleware,
    upload.single("image"),
    async (req, res) => {
      const uuid = uuidV4();
      const dateTime = Date.now();
      const fileToBeUploaded = req.file;
      fileToBeUploaded.id = uuid;
      // console.log("requesta 52", req);
      console.log("requesta 58", req.file);
      console.log("59 parmas", req.query?.forceUpload);
      const forceUpload = req.query?.forceUpload;
      try {
        const existingFile = await FileModel.findOne({
          fileName: fileToBeUploaded.originalname,
          userId: req.user?.id,
        }).exec();
        if (existingFile && forceUpload !== "true") {
          const error = new Error("selected file already exists");
          error.code = 3006;
          throw error;
        }
        console.log("existingFile 63", existingFile);
        const s3Res = await awsPutCall(fileToBeUploaded);
        const mongoRes = await new FileModel({
          fileId: uuid,
          fileName: fileToBeUploaded.originalname,
          s3Key: uuid,
          fileSize: fileToBeUploaded.size,
          mimeType: fileToBeUploaded.mimetype,
          createdAt: dateTime,
          modifiedAt: dateTime,
          userId: req.user?.id,
          markedDeleted: false,
        }).save();
        console.log("file uploaded in mongo");
        res.status(200).json({ message: "uploaded to S3 and mongo" });
      } catch (err) {
        console.log("83", err);
        res.status(400).json({ message: err.message, code: err.code });
      }
    }
  );

  app.get("/api/files", corsMiddleware, async (req, res) => {
    try {
      const filesRes = await FileModel.find({ userId: req.user?.id }).exec();

      console.log("all files 84", filesRes);
      res.status(200).json({ fileCount: filesRes.length, files: filesRes });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};

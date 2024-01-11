const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const mongoose = require("mongoose");
const { v4: uuidV4 } = require("uuid");
const corsMiddleware = require("../middlewares/corsMiddleware");
const upload = require("../middlewares/multer");
const client = require("../config/awsConfig");
const FileModel = mongoose.model("files");

const awsPutCall = async (fileToBeUploaded) => {
  try {
    const input = {
      Body: fileToBeUploaded.buffer,
      Bucket: "doculocker",
      Key: fileToBeUploaded.id,
      Metadata: {
        mimetype: fileToBeUploaded.mimetype,
      },
    };
    const command = new PutObjectCommand(input);
    const response = await client.send(command);
  } catch (err) {
    console.error("aws error", err);
  } finally {
    console.log("ending AWS code");
  }
};

// get presignedUrls
const awsGetPresignedUrls = async (filesData) => {
  const preSignedUrls = [];
  for (const file of filesData) {
    const fileConfig = {
      Key: file.s3Key,
      Bucket: "doculocker",
      ContentDisposition: `attachment, filename: "abc.png"`,
    };
    const command = new GetObjectCommand(fileConfig);
    const preSignedUrl = await getSignedUrl(client, command, {
      expiresIn: 120,
    });
    preSignedUrls.push({ ...file, preSignedUrl });
  }
  return preSignedUrls;
};

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
          starred: false,
          tagIds: [],
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
    const {
      page,
      limit,
      markedDeleted,
      searchFilterText,
      typeFilter,
      mimeTypes,
      starred,
      selectedTagIds,
    } = req.query;
    const mimeTypeQueryObj = (() => {
      switch (typeFilter) {
        case "TYPE":
          return { $not: { $in: [] } };
        case "OTHERS":
          return { $not: { $in: [...mimeTypes.split(",")] } };
        default:
          return { $in: [...mimeTypes.split(",")] };
      }
    })();

    const queryObj = {
      userId: req.user?.id,
      fileName: { $regex: searchFilterText, $options: "i" },
      markedDeleted: markedDeleted,
      mimeType: mimeTypeQueryObj,
    };
    if (starred) {
      queryObj.starred = true;
    }
    if (selectedTagIds) {
      queryObj.tagIds = { $all: selectedTagIds.split(",") };
    }
    console.log("queryObj", queryObj);
    try {
      const filesRes = await FileModel.find(queryObj)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();

      const count = await FileModel.countDocuments(queryObj).exec();

      res.status(200).json({ totalFileCount: count, files: filesRes });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.get("/api/files/count", corsMiddleware, async (req, res) => {
    try {
      const count = await FileModel.countDocuments({
        userId: req.user?.id,
      }).exec();
      res.status(200).json({ fileCount: count });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // api for handling file markedDeleted update
  app.delete("/api/file/:id", corsMiddleware, async (req, res) => {
    const { id: fileId } = req.params;
    const { restore = false } = req.query;
    console.log("115", req.params);
    try {
      const mongoRes = await FileModel.findOneAndUpdate(
        { _id: fileId, userId: req.user?.id },
        { markedDeleted: !restore }
      );
      res.status(200).json({ fileId });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // api for handling tagIds update
  app.put("/api/file/:id", corsMiddleware, async (req, res) => {
    const { id: fileId } = req.params;
    const { fileToBeUploaded } = req.body;
    try {
      await FileModel.findOneAndUpdate(
        { _id: fileId, userId: req.user?.id },
        { tagIds: fileToBeUploaded.tagIds }
      );
      res.status(200).json({ fileToBeUploaded });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //api for handling file star update

  app.put("/api/file/:id/update-star", corsMiddleware, async (req, res) => {
    const { id: fileId } = req.params;
    const { starred } = req.query;
    try {
      await FileModel.findOneAndUpdate(
        { _id: fileId, userId: req.user?.id },
        { starred: starred }
      );
      res.status(200).json({ message: "file updated successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.post("/api/files/download", corsMiddleware, async (req, res) => {
    const { filesData } = req.body;
    try {
      const filesRes = await FileModel.find({
        s3Key: { $in: filesData.map((fileData) => fileData.s3Key) },
        userId: req.user?.id,
      }).exec();
      if (filesData.length !== filesRes.length)
        throw new Error("Malicious attempt!");
      const preSignedUrlsData = await awsGetPresignedUrls(filesData);
      res.status(200).json({
        message: "presigned urls received successfully",
        preSignedUrlsData,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};

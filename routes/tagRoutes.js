const mongoose = require("mongoose");
const { v4: uuidV4 } = require("uuid");
const corsMiddleware = require("../middlewares/corsMiddleware");
const TagModel = mongoose.model("tags");

module.exports = (app) => {
  // add a tag

  app.post("/api/tag", corsMiddleware, async (req, res) => {
    console.log("hello add tag");
    try {
      console.log("req.body 11", req.body);
      const tagName = req.body.tagName;
      if (!tagName) throw new Error("Empty tag name received");
      const existingTag = await TagModel.findOne({
        tagName: tagName,
        userId: req.user?.id,
      }).exec();
      if (existingTag) throw new Error(`'${existingTag}' already exists`);
      const dateTime = Date.now();
      await new TagModel({
        tagId: uuidV4(),
        tagName: tagName,
        userId: req.user?.id,
        createdAt: dateTime,
        modifiedAt: dateTime,
      }).save();
      res
        .status(200)
        .json({ message: `Tag: ${req.body.tagName}, added successfully` });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ message: err.message });
    }
  });

  app.get("/api/tags", corsMiddleware, async (req, res) => {
    const userId = req.user?.id;
    try {
      const tags = await TagModel.find(
        {
          userId: userId,
        },
        { tagName: true }
      ).exec();
      res.status(200).json({ tags: tags });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};

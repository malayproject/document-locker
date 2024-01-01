const multer = require("multer"); // Middleware for handling multipart/form-data (file uploads)

// multer middleware config
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
module.exports = upload;

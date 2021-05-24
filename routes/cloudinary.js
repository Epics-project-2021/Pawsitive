const cloudinary = require("cloudinary");
const config = require("config");
const name = config.get("CLOUD_NAME");
const id = config.get("CLOUD_API_ID");
const secret = config.get("CLOUD_API_SERVER");
cloudinary.config({
  cloud_name: name,
  api_key: id,
  api_secret: secret,
});

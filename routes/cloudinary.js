const cloudinary = require('cloudinary');
const config = require('config');
const name = process.env.CLOUD_NAME || config.get('CLOUD_NAME');
const id = process.env.CLOUD_API_ID || config.get('CLOUD_API_ID');
const secret = process.env.CLOUD_API_SERVER || config.get('CLOUD_API_SERVER');
cloudinary.config({
    cloud_name: name,
    api_key: id,
    api_secret: secret,
});

const multer = require('multer');
const File = require('../models/fileModel');

//multer
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});

const upload = multer({ storage });

module.exports.multerUpload = upload;

module.exports.multerPost = async (req, res) => {
  try {
    const { filename, path, mimetype, date_created} = req.file;

    const fileData = {
      filename,
      path,
      mimetype,
      date_created,
    };

    await File.create(fileData);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading file');
  }
};

module.exports.multerGet = async (req, res) => {
    try {
        const files = await File.find();
        res.send(files);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting files');
    }
}
const express = require('express');
const router = express.Router();
const File = require('../models/fileModel');
const {multerUpload,multerGet, multerPost} = require('../controllers/viewProjectController');

router.get('/viewProject', function(req, res) {
  res.render('viewProject', {projectname: req.params.projectname});
  //__dirname,`../public/pdf/${req.params.filename}.pdf`
})

router.get('/viewProject/:filename', async (req, res) => {
    const file = await File.findOne({filename: req.params.filename}); // Fetch metadata from MongoDB
    console.log(file)
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.render('viewProject', {projectname: req.params.projectname, path: file.path, fileType:file.mimetype});
});

//multer
router.get('/viewProject/:projectname/:path', multerGet);
router.post('/viewProject/:projectname', multerUpload.single('file'), multerPost);

module.exports = router;
const express = require('express');
const router = express.Router();
const {multerUpload,multerGet, multerPost} = require('../controllers/viewProjectController');

router.get('/viewProject/:projectname', function(req, res) {
  res.render('viewProject', {projectname: req.params.projectname});
  //__dirname,`../public/pdf/${req.params.filename}.pdf`
})

//multer
router.get('/viewProject/:projectname', multerGet);
router.post('/viewProject/:projectname', multerUpload.single('file'), multerPost);

module.exports = router;
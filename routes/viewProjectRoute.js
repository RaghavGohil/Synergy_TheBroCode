const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/viewProject/:projectname', function(req, res) {
  res.render('viewProject', {projectname: req.params.projectname});
  //__dirname,`../public/pdf/${req.params.filename}.pdf`
})

module.exports = router;
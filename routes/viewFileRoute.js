const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/viewfile/:filename', function(req, res) {
  res.render('viewFile', {filename: req.params.filename});
  //__dirname,`../public/pdf/${req.params.filename}.pdf`
})

module.exports = router;
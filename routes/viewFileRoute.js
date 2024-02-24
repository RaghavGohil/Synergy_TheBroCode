const express = require('express');
const router = express.Router();

router.get('/viewfile/:filename', function(req, res) {
  res.sendFile(__dirname + `/public/pdf/${req.params.filename}.pdf`);
})

module.exports = router;
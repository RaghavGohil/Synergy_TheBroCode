const express = require('express');
const router = express.Router();

router.get('/projects', (req, res) => {
    res.render('projects', {data: 'Projects page'});
});

module.exports = router;
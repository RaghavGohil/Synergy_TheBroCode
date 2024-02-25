const express = require('express');
const router = express.Router();
const {projectsGet} = require('../controllers/projectsController');

router.get('/projects', projectsGet);

module.exports = router;
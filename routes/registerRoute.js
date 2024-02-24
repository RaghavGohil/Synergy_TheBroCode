const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', registerController.registerPost);
module.exports = router;

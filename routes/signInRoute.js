const express = require('express');
const router = express.Router();
const signInController = require('../controllers/signInController');

router.get('/signIn', (req, res) => {
    res.render('signIn');
});

router.post('/signIn', signInController.signInPost);

module.exports = router;
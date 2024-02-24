const mongoose = require('mongoose');
const User = require('../models/userModel');

const databaseUrl = process.env.DATABASE_URL;

// connect to mongodb
mongoose.connect(databaseUrl)
.then(() => {console.log('register connected to MongoDB.')})

module.exports.registerPost = async (req, res) => {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        isAdmin: false
      });
      await user.save();
      res.redirect('/signIn');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
};
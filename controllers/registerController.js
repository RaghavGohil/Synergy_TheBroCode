const mongoose = require('mongoose');
const User = require('../models/userModel');

const databaseUrl = 'mongodb+srv://raghavgohil2004:hw5nch4c1m%40mongo@synergy.qimy4o3.mongodb.net/test';

// connect to mongodb
mongoose.connect(databaseUrl)
.then(() => {console.log('register connected to MongoDB.')})

module.exports.registerPost = async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        projectIDs: [],
        isAdmin: false
      });
      await user.save();
      res.redirect('/signIn');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
};
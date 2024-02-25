const mongoose = require('mongoose');
const User = require('../models/userModel');

const databaseUrl = 'mongodb+srv://raghavgohil2004:hw5nch4c1m%40mongo@synergy.qimy4o3.mongodb.net/test';

// connect to mongodb
mongoose.connect(databaseUrl)
.then(() => {console.log('signIn connected to MongoDB.')})
.catch(err => console.error(err));

module.exports.signInPost = async (req, res) => {
  try{
    const user = await User.findOne({ username : req.body.username});
    if (!user) {
      return res.redirect('/signIn');
    }

    const isMatch = (req.body.password === user.password);
    if (!isMatch) {
      return res.redirect('/signIn');
    }

    req.session.isLoggedIn = true;
    req.session.userId = user._id;
    res.redirect('/'); // Redirect to home on successful login
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
}

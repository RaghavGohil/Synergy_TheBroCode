const path = require('path');
const dotenv = require('dotenv');

const express =  require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const User = require('./models/loginModel');

const app = express();
const port = 3000;
const { engine } = require('express-handlebars');

//dotenv
dotenv.config();
const databaseUrl = process.env.DATABASE_URL;
const secretKey = process.env.SECRET_KEY;

// connect to mongodb
mongoose.connect(databaseUrl)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

// middlewares 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
  secret: secretKey,
  resave: false,
  saveUninitialized: true
}));

// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'views'));

//login
app.use('/', require('./routes/loginRoute'));
app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try{
    const user = await User.findOne({ username : req.params.username});
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid username or password');
    }

    req.session.isLoggedIn = true;
    req.session.userId = user._id;
    res.redirect('/'); // Redirect to home on successful login
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// routes
app.use('/', require('./routes/homeRoute'));
app.use('/', require('./routes/projectsRoute'));
app.use('/', require('./routes/viewFileRoute'));

app.listen(port,() => console.log(`Server is running at port${port}`));
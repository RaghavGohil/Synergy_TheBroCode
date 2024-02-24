const path = require('path');
const dotenv = require('dotenv');

const express =  require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

const app = express();
const port = 3000;
const { engine } = require('express-handlebars');

//dotenv
dotenv.config();
const secretKey = process.env.SECRET_KEY;

// middlewares 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
  secret: secretKey,
  resave: false,
  saveUninitialized: true
}));
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
})

// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'views'));

// routes
app.use('/', require('./routes/signInRoute'));
app.use('/', require('./routes/registerRoute'));
app.use('/', require('./routes/homeRoute'));
app.use('/', require('./routes/projectsRoute'));
app.use('/', require('./routes/viewProjectRoute'));

app.listen(port,() => console.log(`Server is running at port${port}`));
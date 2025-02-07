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
const secretKey = 'secret';

// middlewares 
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
  secret: secretKey,
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.isLoggedIn = { message: req.session.isLoggedIn };
    next();
});

app.get('/logout', (req, res) => {
    req.session.isLoggedIn = false;
    req.session.destroy();
    res.redirect('/signIn');
});

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

app.listen(port,() => console.log(`Server is not running at port${port}`));
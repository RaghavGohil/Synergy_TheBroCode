// Playground
const path = require('path');
const express =  require('express');
const app = express();
const port = 3000;
const { engine } = require('express-handlebars');

// static files
app.use(express.static('public'));

// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'views'));

// routes
app.use('/', require('./routes/home'));
app.use('/', require('./routes/projects'));

app.listen(port,() => console.log(`Server is running at port${port}`));
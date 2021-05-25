const express = require('express');
const ejs = require('ejs');
const connectDB = require('./database/db');
const config = require('config');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var MemoryStore = require('memorystore')(session);
const passport = require('passport');
require('./auth/passportLocal')(passport);
require('./auth/googleAuth')(passport);

const app = express();
//Setting up ejs views
app.set('view engine', 'ejs');

//Init Middleware
app.use(express.urlencoded({ extended: true }));

//Serving static files in express
app.use(express.static('public'));

app.use(cookieParser(config.get('secret')));
app.use(
    session({
        secret: config.get('secret'),
        resave: true,
        saveUninitialized: false,
        store: new MemoryStore({
            checkPeriod: 86400000, // prune expired entries every 24h
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());
//Home route
app.get('/', function (req, res) {
    res.render('home', {
        req: req,
    });
});

//Define Routes
app.use('/auth', require('./routes/auth'));
app.use('/feed', require('./routes/feed'));
app.use('/profile', require('./routes/profile'));
app.use('/content', require('./routes/content'));
app.use('/compose', require('./routes/compose'));
app.use('/edit', require('./routes/edit'));
app.use('/delete', require('./routes/delete'));

//Starting the server
let PORT = process.env.PORT || 3000;
// app.listen(PORT, function (req, res) {
//     console.log('Server is running at port 3000');
// });

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on ${PORT}`);
    });
});

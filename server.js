const express = require('express');
const ejs = require('ejs');
const connectDB = require('./database/db')
const app = express();

//Setting up ejs views
app.set('view engine', 'ejs');

//Init Middleware
app.use(express.json({ extended: false }));

//Serving static files in express
app.use(express.static('public'));

//Home route
app.get('/', function (req, res) {
    res.render('home');
});

//Define Routes
app.use('/auth', require('./routes/auth'));
app.use('/feed', require('./routes/feed'));
app.use('/profile', require('./routes/profile'));
app.use('/content', require('./routes/content'));
app.use('/compose', require('./routes/compose'));
app.use('/edit', require('./routes/edit'));

//Starting the server
let PORT = process.env.PORT || 3000;
// app.listen(PORT, function (req, res) {
//     console.log('Server is running at port 3000');
// });

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server started on ${PORT}`)
    });
})
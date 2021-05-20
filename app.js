const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get('/', function(req, res){
    res.render("home"); 
});
app.get('/about', function(req, res){
    res.render("about");
})
app.get('/feed', function(req, res){
    res.render("feed");
})
app.get('/user-feed', function(req, res){
    res.render("user-dashboard");
})

app.listen(3000, function (req, res) {
    console.log("Server is running at port 3000");
});
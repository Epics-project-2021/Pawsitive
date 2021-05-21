const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.render("home");
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.get("/feed", function (req, res) {
  res.render("feed");
});
app.get("/profile", function (req, res) {
  res.render("user-dashboard");
});
app.get("/content", function (req, res) {
  res.render("post-content");
});
app.get("/edit", function (req, res) {
  res.render("edit");
});
app.get("/signin", function (req, res) {
  res.render("signin");
});
app.get("/signup", function (req, res) {
  res.render("signup");
});
app.listen(3000, function (req, res) {
  console.log("Server is running at port 3000");
});

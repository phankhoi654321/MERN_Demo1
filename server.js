const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");     //Passport is a Node.js middleware that offers a variety of different request authentication strategies that are easy to implement.git 


const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false})); //the value can be string
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//Connect to mongoDb
mongoose
  .connect(db)
  .then(() => console.log("mongoDb Connected")) // this is the promis return then and catch
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);     //passport is param from passport.js

//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

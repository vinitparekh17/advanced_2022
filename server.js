const express = require("express");
const ejs = require("ejs");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", __dirname + '/routes/views')

//routes
app.use(require('./routes/home'))
app.use(require('./routes/movies'))
app.use(require('./routes/anime'))
app.use(require('./routes/playstore'))
app.use(require('./routes/weather'))
app.use(require('./routes/music'))

//checking that user is logged in or not

// Init server on port 
app.listen(8000, () => console.log("http:localhost:8000"));
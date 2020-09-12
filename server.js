// IMPORTING NEEDED FUNCTIONS/MODULES
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path')

// CREATING THE EXPRESS APP, AND USING A PORT
var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"))

// ALLOWING USE OF URL ECODING AND JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// LINE TO ALLOW USE OF EXTERNAL ASSETS
app.use(express.static(path.join(__dirname, 'public')))

// CONNECTING DATABASE
var localhostConnection = "mongodb://localhost/workout";
let dbConnection = process.env.MONGODB_URI || localhostConnection;
mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useFindAndModify: false
});

// ADDING THE SERVER ROUTES
app.use("/api", require("./routes/api-routes.js"));
app.use("/", require("./routes/html-routes.js"));

// RETURNING THE PORT IT IS ON
app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
})
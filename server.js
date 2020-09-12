// IMPORTING NEEDED FUNCTIONS/MODULES
const express = require("express");
const path = require('path')
// CREATING THE EXPRESS APP, AND USING A PORT
var app = express();
var PORT = process.env.PORT || 3000;

// ALLOWING USE OF URL ECODING AND JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// LINE TO ALLOW USE OF EXTERNAL ASSETS
app.use(express.static(path.join(__dirname, 'public')))

// ADDING THE SERVER ROUTES
// ADDING THE SERVER ROUTES
app.use("/api", require("./routes/api-routes.js"));
app.use("/", require("./routes/html-routes.js"));

// RETURNING THE PORT IT IS ON
app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
})
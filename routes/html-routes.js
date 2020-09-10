const path = require("path")

var htmlRoutes = app => {
    // ROUTE TO EXERCISE INPUT FORM PAGE
    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/exerise.html"))
    });

    // ROUTE TO GET STATS PAGE
    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    })

    // ROUTE TO HOME PAGE
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}

module.exports = htmlRoutes;
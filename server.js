var express = require("express");

var app = express();

app.set("port", (process.env.PORT || 5000));
app.set("view engine", "ejs");

app.get("/", getData);

app.listen(app.get("port"), function() {
    console.log("The server is listening on port " + app.get("port"));
});

function getData(req, res) {
    console.log("Getting Data");
    res.write("{\"name\" : \"LaRee\"}");
    res.end();
}
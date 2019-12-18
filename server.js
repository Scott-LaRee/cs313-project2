const express = require("express");
const path = require ("path");
const gameController = require ("./controllers/gameController.js");
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());
app.set("port", (process.env.PORT || 5000));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/loadGame", gameController.loadGame);
app.post("/saveGame", gameController.saveGame);
app.post("/deleteSavedGame", gameController.deleteSavedGame);
app.get("/getGameId", gameController.getGameId);

app.listen(app.get("port"), function() {
    console.log("The server is listening on port " + app.get("port"));
});

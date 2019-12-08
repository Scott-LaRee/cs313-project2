const express = require("express");
const path = require ("path");
const gameController = require ("./controllers/gameController.js")
var app = express();
/*
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://keepscoreuser:scorekeeping@localhost:5432/keepscore"
const pool = new Pool({connectionString: connectionString});
*/
app.set("port", (process.env.PORT || 5000));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", gameController.loadGame);
app.get("/loadGame", gameController.loadGame);
app.post("/saveGame", gameController.saveGame);
app.post("/deleteSavedGame", gameController.deleteSavedGame);

app.listen(app.get("port"), function() {
    console.log("The server is listening on port " + app.get("port"));
});

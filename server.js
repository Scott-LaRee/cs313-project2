var express = require("express");

var app = express();

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://keepscoreuser:scorekeeping@localhost:5432/keepscore"
const pool = new Pool({connectionString: connectionString});
app.set("port", (process.env.PORT || 5000));
app.set("view engine", "ejs");

//app.get("/", loadGame);
app.get("/loadGame", loadGame);


app.listen(app.get("port"), function() {
    console.log("The server is listening on port " + app.get("port"));
});

function loadGame(req, res) {
    console.log("Loading Game");

    var title = req.query.title;
    console.log("Retrieving game with title ", title);

    getGameFromDb(title, function(error, result) {
        if (error || result == null || result.length != 1) {
            Response.status(500).json({success:false, data: error});
        } else {
            res.json(result[0]);
            //res.render('result', json(result[0]));
            res.end();
        }
        console.log("Back from getGameFromDb with result:", result);
    });
    /*
    var result = {
        game_id: 23,
        title: 'shanghi', 
        user_id: 11,
        win_high: 'f', 
      players: {
        player1: {name: 'Mom', total: 30, round1: 30},
        player2: {name: 'Dad', total: 20, round1: 20},
        player3: {name: 'LaRee', total: 10, round1: 10}
    } 
  };
    res.json(result);
    /*
    res.write("{\"name\" : \"LaRee\"}");
    res.end();*/
}

function getGameFromDb(title, callback) {
    console.log("getGameFromDb called with title", title);

    var sql = "SELECT id, title, user_id, win_high FROM games WHERE title = $1::varchar";
    var params = [title];

    pool.query(sql, params, function(err, result) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        }

        console.log("Found DB result: " + JSON.stringify(result.rows));

        callback(null, result.rows);
    });
}
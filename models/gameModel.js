const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://keepscoreuser:scorekeeping@localhost:5432/keepscore"
const pool = new Pool({connectionString: connectionString});

function getGameFromDb(title, callback) {
  console.log("getGameFromDb called with title", title);

  //var results = {id:1, title: 'uno'};
    
  var sql = "SELECT game_id, title, win_low, name, total, round1, round2, round3, " +
            "round4, round5, round6, round7, round8, round9, round10 " + 
            "FROM players INNER JOIN game_players ON players.id = " + 
            "game_players.player_id INNER JOIN games ON " +
            "game_players.game_id = games.id WHERE games.title = $1::varchar";
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

function insertGame(game, playersArray, callback) {
  var sql = "INSERT INTO games title, win_low VALUES " +
            "($1::varchar, $2::boolean)";
  var params = [game.title, game.win_low];

  pool.query(sql, params, function(err, result) {
    if (err) {
        console.log("An error with the database occurred");
        console.log(err);
        callback(err, null);
    }

    var query = "INSERT INTO players (name, total, round1, round2, " +
                "round3, round4, round5, round6, round7, round8, round9" +
                "round10) VALUES ";
    

    for (var i = 0; i < playersArray.length - 1; i++) {
      query += playersArray[i]
    }
});

  var results = {success:true};
  callback(null, results);
}

function deleteGame(title, callback) {
  var results = {success:true};
  callback(null, results);
}

module.exports = {
  getGameFromDb: getGameFromDb,
  insertGame: insertGame,
  deleteGame: deleteGame
}
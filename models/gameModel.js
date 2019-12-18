const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://keepscoreuser:scorekeeping@localhost:5432/keepscore"
const pool = new Pool({connectionString: connectionString});

function getGameFromDb(title, password, callback) {
  console.log("getGameFromDb called with title", title);
    
  var sql = "SELECT game_id, title, win_low, name, total, round1, round2, round3, " +
            "round4, round5, round6, round7, round8, round9, round10, player_id " + 
            "FROM players INNER JOIN game_players ON players.id = " + 
            "game_players.player_id INNER JOIN games ON " +
            "game_players.game_id = games.id WHERE games.title = $1::varchar " +
            "AND games.password = $2::varchar";
  var params = [title, password];

  pool.query(sql, params, function(err, result) {
      if (err) {
          console.log("An error with the database occurred in getGameFromDb");
          console.log(err);
          callback(err, null);
      } else {
        console.log("Found DB result: " + JSON.stringify(result.rows));

        callback(null, result.rows);
      }      
  });  
}

function insertGame(title, password, win_low, callback) {
  console.log("Inserting Game");
  console.log("title = " + title, " password = " + password + " win_low = " + win_low);
  var sql = "INSERT INTO games (title, win_low, password) VALUES " +
            "($1::varchar, $2::boolean, $3::varchar)";
  var params = [title, win_low, password];
  
  pool.query(sql, params, function(err, result) {
    if (err) {
        console.log("An error with the database occurred in insertGame");
        console.log(err);
        callback(err, null);
    } else {
      var results = {success:true};
      callback(null, results);
    }
  });  
}

function insertPlayer(player, callback) {
  var name = player.playerName;
  var score = player.score;
  var r1 = player.round1;
  var r2 = player.round2;
  var r3 = player.round3;
  var r4 = player.round4;
  var r5 = player.round5;
  var r6 = player.round6;
  var r7 = player.round7;
  var r8 = player.round8;
  var r9 = player.round9;
  var r10 = player.round10;

  console.log("Inserting Player");
  console.log("player = " + player);
  console.log("data = " + name + " " + score + " " + r1 + " " + r2 + " " + r3 + " " +
                r4 + " " + r5 + " " + r6 + " " + r7 + " " + r8 + " " + r9 + " " + r10);

  if (player.score != null) {
    var sql = "INSERT INTO players (name, total, round1, round2, round3, " +
            "round4, round5, round6, round7, round8, round9, round10) " +
            "VALUES ($1::varchar, $2::int, $3::int, $4::int, $5::int, " + 
            "$6::int, $7::int, $8::int, $9::int, $10::int, $11::int, $12::int)";
     
    console.log (sql);
    var params = [name, score, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10];

    pool.query(sql, params, function(err, result) {
      if (err) {
        console.log("An error with the database occurred in insertPlayer");
        console.log(err);
        callback(err, null);
      } else {
        var results = {success:true};
        callback(null, results); 
      }
    });  
  } else {
    var results = { success: true };
    callback(null, results);
  }
}

function insertGamePlayer(gameId, playerId, callback) {
  console.log("Inserting Game Players");
  console.log("gameId = " + gameId, " playerId = " + playerId);
    
  var sql = "INSERT INTO game_players (game_id, player_id) " +
            "VALUES ($1::int, $2::int)";
  
  var params = [gameId, playerId];

  pool.query(sql, params, function(err, result) {
    if (err) {
        console.log("An error with the database occurred in insertGamePlayer");
        console.log(err);
        callback(err, null);
    } else {
      var results = {success:true};
      callback(null, results); 
    }
  });  
}

function getGameId(title, password, callback) {
  console.log("Getting Game ID");
  console.log("title = " + title);
  
  var sql = "SELECT id FROM games WHERE games.title = $1::varchar " +
            "AND games.password = $2::varchar";

  params = [title, password];
  pool.query(sql, params, function(err, result) {
    if (err) {
        console.log("An error with the database occurred in getGameId");
        console.log(err);
        callback(err, null);
    } else {
      console.log("Found DB result: " + JSON.stringify(result.rows));
      callback(null, result.rows);
    }
  });  
}

function getPlayerId(player, callback) {
  console.log("Getting Player ID");
  console.log(player.playerName + " " + player.score);

  var sql = "SELECT id FROM players WHERE players.name = $1::varchar" +
            " AND players.total = $2::int;";

  params = [player.playerName, player.score];

  pool.query(sql, params, function(err, result) {
    if (err) {
        console.log("An error with the database occurred in getPlayerId");
        console.log(err);
        callback(err, null);
    }
    else {
      console.log("Found DB result: " + JSON.stringify(result.rows));
      callback(null, result.rows); 
    }
  });  
}

function deleteGame(title, password, callback) {
  console.log("Deleting Game");
  console.log("title = " + title + " password = " + password);
  var sql = "DELETE FROM players p USING game_players gp WHERE ";

  params = [title, password];

  pool.query(sql, params, function(err, result) {
    if (err) {
        console.log("An error with the database occurred");
        console.log(err);
        callback(err, null);
    }
    else{
      var results = {success:true};
      callback(null, results); 
    }
  });
  var results = {success:true};
  callback(null, results);
}

function updatePlayer(player, callback) {
  var name = player.playerName;
  var score = player.score;
  var r1 = player.round1;
  var r2 = player.round2;
  var r3 = player.round3;
  var r4 = player.round4;
  var r5 = player.round5;
  var r6 = player.round6;
  var r7 = player.round7;
  var r8 = player.round8;
  var r9 = player.round9;
  var r10 = player.round10;
  var playerId = player.playerId;

  console.log("Inserting Player");
  console.log("player = " + player);
  console.log("data = " + name + " " + score + " " + r1 + " " + r2 + " " + r3 + " " +
                r4 + " " + r5 + " " + r6 + " " + r7 + " " + r8 + " " + r9 + " " + r10);

  if (player.score != null) {
    var sql = "UPDATE players SET total = $1::int, round1 = $2::int, round2 = $3::int, " +
              "round3 = $4::int, round4 = $5::int, round5 = $6::int, round6 = $7::int, " +
              "round7 = $8::int, round8 = $9::int, round9 = $10::int, round10 = $11::int" +
              " WHERE id = $12::int";
     
    console.log (sql);
    var params = [score, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, playerId];

    pool.query(sql, params, function(err, result) {
      if (err) {
        console.log("An error with the database occurred in insertPlayer");
        console.log(err);
        callback(err, null);
      } else {
        var results = {success:true};
        callback(null, results); 
      }
    });  
  } else {
    var results = { success: true };
    callback(null, results);
  }
}

module.exports = {
  getGameFromDb: getGameFromDb,
  insertGame: insertGame,
  insertPlayer: insertPlayer,
  insertGamePlayer: insertGamePlayer,
  getGameId: getGameId,
  getPlayerId: getPlayerId,
  deleteGame: deleteGame,
  updatePlayer: updatePlayer
}